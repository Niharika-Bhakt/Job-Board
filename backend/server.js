require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

let resumeBucket;

// Multer configuration
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, DOC and DOCX files are allowed.'));
        }
    }
});

// Application Schema
const applicationSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    applicantName: {
        type: String,
        required: true
    },
    applicantEmail: {
        type: String,
        required: true
    },
    applicantPhone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: () => new Date().toLocaleDateString()
    },
    resumeFileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    resumeFilename: {
        type: String,
        required: true
    }
});

const Application = mongoose.model('Application', applicationSchema);

// Home route
app.get('/', (req, res) => {
    res.send('Job Board Backend is Running!');
});

// Submit application with resume
app.post('/api/applications', upload.single('resume'), async (req, res) => {
    let uploadedFileId = null;

    try {
        const {
            jobTitle,
            company,
            applicantName,
            applicantEmail,
            applicantPhone
        } = req.body;

        if (
            !jobTitle ||
            !company ||
            !applicantName ||
            !applicantEmail ||
            !applicantPhone
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all application details.'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload your resume.'
            });
        }

        const uploadStream = resumeBucket.openUploadStream(
            req.file.originalname,
            {
                contentType: req.file.mimetype
            }
        );

        uploadedFileId = uploadStream.id;

        await new Promise((resolve, reject) => {
            uploadStream.once('finish', resolve);
            uploadStream.once('error', reject);
            uploadStream.end(req.file.buffer);
        });

        const newApplication = new Application({
            jobTitle,
            company,
            applicantName,
            applicantEmail,
            applicantPhone,
            date: new Date().toLocaleDateString(),
            resumeFileId: uploadedFileId,
            resumeFilename: req.file.originalname
        });

        await newApplication.save();

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully!',
            applicationId: newApplication._id
        });

    } catch (err) {
        if (uploadedFileId && resumeBucket) {
            try {
                await resumeBucket.delete(uploadedFileId);
            } catch (deleteError) {
                console.error('Resume cleanup failed:', deleteError.message);
            }
        }

        console.error('Application Error:', err.message);

        res.status(500).json({
            success: false,
            message: 'Application could not be submitted.',
            error: err.message
        });
    }
});

// Get all applications
app.get('/api/applications', async (req, res) => {
    try {
        const applications = await Application.find()
            .select('-__v')
            .sort({ _id: -1 })
            .lean();

        const result = applications.map(application => ({
            ...application,
            resumeDownloadUrl: `/api/applications/${application._id}/resume`
        }));

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Download an application's resume
app.get('/api/applications/:id/resume', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid application ID.'
            });
        }

        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found.'
            });
        }

        const files = await resumeBucket.find({
            _id: application.resumeFileId
        }).toArray();

        if (!files.length) {
            return res.status(404).json({
                success: false,
                message: 'Resume file not found.'
            });
        }

        const file = files[0];

        res.setHeader(
            'Content-Type',
            file.contentType || 'application/octet-stream'
        );

        res.setHeader(
            'Content-Disposition',
            `attachment; filename*=UTF-8''${encodeURIComponent(file.filename)}`
        );

        const downloadStream = resumeBucket.openDownloadStream(
            application.resumeFileId
        );

        downloadStream.on('error', err => {
            console.error('Resume Download Error:', err.message);

            if (!res.headersSent) {
                res.status(500).json({
                    success: false,
                    message: 'Resume download failed.'
                });
            }
        });

        downloadStream.pipe(res);

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Start server
async function startServer() {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI missing in .env file');
        }

        await mongoose.connect(MONGO_URI);

        console.log('MongoDB Connected Successfully!');

        resumeBucket = new mongoose.mongo.GridFSBucket(
            mongoose.connection.db,
            {
                bucketName: 'resumes'
            }
        );

        console.log('Resume Storage Ready!');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error('Database Connection Failed:', err.message);
    }
}

// Handle upload errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: 'Resume file must be 5 MB or smaller.'
        });
    }

    if (err.message === 'Only PDF, DOC and DOCX files are allowed.') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    console.error(err);

    res.status(500).json({
        success: false,
        message: 'Something went wrong.'
    });
});

startServer();