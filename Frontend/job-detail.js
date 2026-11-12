
// Sabhi jobs ka alag-alag data aur exact salaries
const jobsData = {
    "1": {
        title: "Senior Product UI/UX Designer",
        company: "PixelCraft Studio",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$8,500 - $11,000 / month",
        description: "Design intuitive high-fidelity user interfaces, user research flows, and scalable enterprise design systems.",
        responsibilities: [
            "Create wireframes, user flows, and interactive prototypes.",
            "Conduct user research and usability testing sessions.",
            "Collaborate with product managers and frontend engineers."
        ],
        skills: ["Figma", "Design Systems", "User Testing", "Prototyping"],
        aboutCompany: "PixelCraft Studio is a leading design agency building next-gen user experiences for top global clients."
    },
    "2": {
        title: "Full Stack Web Developer",
        company: "TechScale Systems",
        location: "New York, NY",
        type: "Full-time",
        salary: "$10,000 - $13,500 / month",
        description: "Architect scalable modern web apps, high-speed REST API services, and responsive client dashboards.",
        responsibilities: [
            "Develop end-to-end full stack features using modern JavaScript frameworks.",
            "Optimize database queries and server response times.",
            "Write clean, maintainable, and well-tested code."
        ],
        skills: ["React.js", "Node.js", "TypeScript"],
        aboutCompany: "TechScale Systems builds high-performance infrastructure and enterprise web solutions."
    },
    "3": {
        title: "Senior Data Analytics Engineer",
        company: "MetricsEdge Analytics",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$9,200 - $12,000 / month",
        description: "Manage end-to-end data pipelines, statistical reporting metrics, and automated executive dashboards.",
        responsibilities: [
            "Build robust ETL pipelines for large-scale data processing.",
            "Collaborate with stakeholders to define key analytical metrics.",
            "Ensure data accuracy and optimal query performance."
        ],
        skills: ["Python", "SQL", "Tableau"],
        aboutCompany: "MetricsEdge Analytics turns complex datasets into clear, actionable business insights."
    },
    "4": {
        title: "Security Operations Specialist",
        company: "SecureGuard Networks",
        location: "Washington, DC (Hybrid)",
        type: "Full-time",
        salary: "$11,000 - $14,000 / month",
        description: "Monitor network vulnerabilities, defend against threat vectors, and execute penetration testing protocols.",
        responsibilities: [
            "Analyze security logs and detect anomalies in real-time.",
            "Perform vulnerability assessments and risk analyses.",
            "Implement security patches and incident response frameworks."
        ],
        skills: ["SIEM", "Ethical Hacking", "Firewalls"],
        aboutCompany: "SecureGuard Networks protects enterprise infrastructure from advanced cyber threats."
    },
    "5": {
        title: "Senior Node.js Backend Engineer",
        company: "DataScale Labs",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$11,500 - $15,000 / month",
        description: "Architect low-latency microservice clusters, database query indexing, and event-driven backends.",
        responsibilities: [
            "Design scalable backend architecture and RESTful APIs.",
            "Handle database optimization and high-concurrency traffic.",
            "Ensure high availability and security of backend systems."
        ],
        skills: ["Node.js", "PostgreSQL", "Redis"],
        aboutCompany: "DataScale Labs focuses on building massive scale backend data services."
    },
    "6": {
        title: "React.js Frontend Engineer",
        company: "Vivid Web Solutions",
        location: "Remote Worldwide",
        type: "Full-time",
        salary: "$9,000 - $12,500 / month",
        description: "Build fast, accessible, interactive components using React 18, Tailwind CSS, and Next.js framework.",
        responsibilities: [
            "Translate UI/UX wireframes into responsive web components.",
            "Optimize frontend performance and web vitals metrics.",
            "Integrate backend APIs seamlessly into the client side."
        ],
        skills: ["React.js", "Next.js", "Tailwind CSS"],
        aboutCompany: "Vivid Web Solutions crafts immersive, high-speed digital web experiences."
    },
    "7": {
        title: "Artificial Intelligence Expert",
        company: "NeuralCore AI",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$13,000 - $17,000 / month",
        description: "Train Large Language Models, generative AI pipelines, and computer vision neural networks.",
        responsibilities: [
            "Design and fine-tune deep learning and transformer models.",
            "Process and clean massive text/image datasets for training.",
            "Deploy AI models into production environments."
        ],
        skills: ["PyTorch", "LLMs", "Python"],
        aboutCompany: "NeuralCore AI pioneers breakthrough machine learning and generative artificial intelligence."
    },
    "8": {
        title: "AWS Cloud Architect",
        company: "CloudScale Systems",
        location: "Seattle, WA",
        type: "Full-time",
        salary: "$10,500 - $14,000 / month",
        description: "Design serverless, multi-cloud infrastructures, automated deployment templates, and cloud security protocols.",
        responsibilities: [
            "Design fault-tolerant and cost-effective cloud architectures.",
            "Automate infrastructure provisioning using Terraform.",
            "Monitor cloud resource utilization and cost optimization."
        ],
        skills: ["AWS", "Terraform", "Kubernetes"],
        aboutCompany: "CloudScale Systems powers cloud transformation for global enterprises."
    },
    "9": {
        title: "DevOps Automation Specialist",
        company: "DevPulse Automation",
        location: "Chicago, IL",
        type: "Full-time",
        salary: "$11,000 - $14,500 / month",
        description: "Build automated CI/CD pipelines, container orchestration, and server monitoring dashboards.",
        responsibilities: [
            "Streamline software release processes through CI/CD automation.",
            "Manage Kubernetes clusters and container runtimes.",
            "Set up comprehensive monitoring and alerting systems."
        ],
        skills: ["Docker", "Jenkins", "Ansible"],
        aboutCompany: "DevPulse Automation accelerates software delivery pipelines through intelligent automation."
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id') || "1";
    const job = jobsData[jobId];

    if (job) {
        document.getElementById('jobTitle').innerText = job.title;
        document.getElementById('companyName').innerText = job.company;
        document.getElementById('jobLocation').innerText = job.location;
        document.getElementById('jobType').innerText = job.type;
        document.getElementById('jobSalary').innerText = job.salary;
        document.getElementById('jobDesc').innerText = job.description;

        const respUl = document.getElementById('jobResponsibilities');

        if (respUl) {
            respUl.innerHTML = job.responsibilities
                .map(r => `<li>${r}</li>`)
                .join('');
        }

        const skillsDiv = document.getElementById('jobSkills');

        if (skillsDiv) {
            skillsDiv.innerHTML = job.skills
                .map(s => `<span style="background:#f1f5f9; padding:6px 12px; margin-right:8px; border-radius:6px; display:inline-block; font-size:14px;">${s}</span>`)
                .join('');
        }

        document.getElementById('companyAbout').innerText = job.aboutCompany;

        const modalTitle = document.getElementById('modalJobTitle');

        if (modalTitle) {
            modalTitle.innerText = job.title;
        }
    }
});

// Modal open
function openApplyModal() {
    const modal = document.getElementById('applyModal');

    if (modal) {
        modal.style.display = 'block';
    }
}

// Modal close
function closeApplyModal() {
    const modal = document.getElementById('applyModal');

    if (modal) {
        modal.style.display = 'none';
    }
}

// Submit application to MongoDB
async function submitApplication(event) {
    event.preventDefault();

    const form = document.getElementById('applicationForm');
    const submitBtn = form.querySelector('button[type="submit"]');

    const applicantName = document.getElementById('applicantName').value.trim();
    const applicantEmail = document.getElementById('applicantEmail').value.trim();
    const applicantPhone = document.getElementById('applicantPhone').value.trim();
    const applicantResume = document.getElementById('applicantResume').files[0];

    const jobTitle = document.getElementById('jobTitle').innerText;
    const company = document.getElementById('companyName').innerText;

    if (!applicantName || !applicantEmail || !applicantPhone || !applicantResume) {
        alert('Please fill all details and upload your resume.');
        return;
    }

    const allowedExtensions = /\.(pdf|doc|docx)$/i;

    if (!allowedExtensions.test(applicantResume.name)) {
        alert('Please upload a PDF, DOC or DOCX resume.');
        return;
    }

    if (applicantResume.size > 5 * 1024 * 1024) {
        alert('Resume size must be 5 MB or less.');
        return;
    }

    const formData = new FormData();

    formData.append('jobTitle', jobTitle);
    formData.append('company', company);
    formData.append('applicantName', applicantName);
    formData.append('applicantEmail', applicantEmail);
    formData.append('applicantPhone', applicantPhone);
    formData.append('resume', applicantResume);

    try {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting...';

        const response = await fetch('http://localhost:5000/api/applications', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Application submission failed.');
        }

        const newApplication = {
            _id: result.applicationId,
            title: jobTitle,
            company: company,
            date: new Date().toLocaleDateString(),
            status: 'Under Review'
        };

        let applications = JSON.parse(localStorage.getItem('myApplications')) || [];

        applications.push(newApplication);

        localStorage.setItem('myApplications', JSON.stringify(applications));

        alert('Application submitted successfully!');

        window.location.href = 'candidate-dashboard.html';

    } catch (error) {
        console.error('Application Error:', error);
        alert(error.message || 'Unable to submit application. Please try again.');

        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit Application';
    }
}
