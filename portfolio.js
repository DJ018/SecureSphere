// ===== ANIMATED COUNTER FOR STATS =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Trigger counter animation when stats come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats grid
document.addEventListener('DOMContentLoaded', () => {
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        statsObserver.observe(statsGrid);
    }
});

// ===== PROJECT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hide');
                card.classList.add('show');
                card.style.display = 'block';
            } else {
                card.classList.add('hide');
                card.classList.remove('show');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== PROJECT MODAL DATA =====
const projectData = {
    project1: {
        title: '🎯 Enterprise Network Penetration Test',
        date: 'December 2025',
        category: 'Penetration Testing',
        client: 'Fortune 500 Technology Company',
        description: 'Conducted a comprehensive security assessment of a large enterprise network infrastructure spanning multiple data centers and cloud environments.',
        objectives: [
            'Identify vulnerabilities in network infrastructure',
            'Test security controls and monitoring systems',
            'Assess incident response capabilities',
            'Evaluate data protection mechanisms'
        ],
        methodology: [
            'Reconnaissance and information gathering',
            'Vulnerability scanning and analysis',
            'Manual exploitation and privilege escalation',
            'Lateral movement and persistence testing',
            'Data exfiltration simulation'
        ],
        findings: [
            '47 critical vulnerabilities identified',
            '12 high-risk misconfigurations discovered',
            'Successful privilege escalation to domain admin',
            'Unencrypted sensitive data transmission detected',
            'Weak password policies across multiple systems'
        ],
        impact: 'Delivered comprehensive remediation roadmap that improved security posture by 85% within 3 months.',
        technologies: ['Nmap', 'Metasploit', 'Burp Suite', 'Wireshark', 'BloodHound', 'Cobalt Strike']
    },
    project2: {
        title: '📊 ISO 27001 Security Audit',
        date: 'November 2025',
        category: 'Security Audit',
        client: 'Healthcare Technology Provider',
        description: 'Complete information security management system (ISMS) audit and gap analysis for ISO 27001:2022 certification.',
        objectives: [
            'Assess compliance with ISO 27001 standards',
            'Identify gaps in security controls',
            'Evaluate risk management processes',
            'Review documentation and policies'
        ],
        methodology: [
            'Document review and analysis',
            'Interviews with key stakeholders',
            'Technical control testing',
            'Risk assessment validation',
            'Gap analysis and reporting'
        ],
        findings: [
            '114 controls assessed across 14 domains',
            '23 gaps identified in current implementation',
            'Risk management framework needs enhancement',
            'Incident response procedures require updates',
            'Access control policies need strengthening'
        ],
        impact: 'Client achieved ISO 27001 certification within 6 months following remediation plan implementation.',
        technologies: ['ISO 27001:2022', 'ISMS', 'Risk Assessment Tools', 'Compliance Management Software']
    },
    project3: {
        title: '🌐 Web Application Security Assessment',
        date: 'October 2025',
        category: 'Penetration Testing',
        client: 'E-commerce Platform',
        description: 'In-depth security testing of a high-traffic e-commerce platform processing over 100,000 daily transactions.',
        objectives: [
            'Test for OWASP Top 10 vulnerabilities',
            'Assess payment processing security',
            'Evaluate authentication mechanisms',
            'Test API security controls'
        ],
        methodology: [
            'Automated vulnerability scanning',
            'Manual code review and testing',
            'SQL injection and XSS testing',
            'Authentication bypass attempts',
            'Business logic flaw analysis'
        ],
        findings: [
            'SQL injection vulnerability in search function',
            'Cross-site scripting (XSS) in user profiles',
            'Insecure direct object references (IDOR)',
            'Missing rate limiting on API endpoints',
            'Weak session management implementation'
        ],
        impact: 'All critical vulnerabilities patched before public disclosure. Platform security rating improved from C to A+.',
        technologies: ['Burp Suite Pro', 'OWASP ZAP', 'SQLMap', 'Nikto', 'Custom Python Scripts']
    },
    project4: {
        title: '✅ GDPR Compliance Implementation',
        date: 'January 2026',
        category: 'Compliance',
        client: 'Healthcare Organization',
        description: 'Comprehensive GDPR compliance program for healthcare provider managing 50,000+ patient records.',
        objectives: [
            'Achieve GDPR compliance',
            'Implement data protection measures',
            'Establish privacy governance',
            'Train staff on data protection'
        ],
        methodology: [
            'Data mapping and classification',
            'Privacy impact assessments',
            'Policy and procedure development',
            'Technical control implementation',
            'Staff training and awareness'
        ],
        findings: [
            'Data inventory completed for all systems',
            'Privacy policies updated and published',
            'Consent management system implemented',
            'Data breach response plan established',
            'Staff training program completed (95% participation)'
        ],
        impact: 'Organization achieved full GDPR compliance with zero data breach incidents in first year.',
        technologies: ['OneTrust', 'Data Classification Tools', 'Encryption Solutions', 'DLP Systems']
    },
    project5: {
        title: '🔐 Cloud Security Architecture Review',
        date: 'September 2025',
        category: 'Security Audit',
        client: 'Fintech Startup',
        description: 'Comprehensive AWS infrastructure security assessment and hardening for financial technology platform.',
        objectives: [
            'Review cloud architecture security',
            'Assess IAM configurations',
            'Evaluate data encryption practices',
            'Test network security controls'
        ],
        methodology: [
            'AWS Well-Architected Framework review',
            'IAM policy analysis',
            'S3 bucket security assessment',
            'Network configuration review',
            'Logging and monitoring evaluation'
        ],
        findings: [
            'Overly permissive IAM policies identified',
            'Public S3 buckets with sensitive data',
            'Missing encryption at rest for databases',
            'Inadequate logging and monitoring',
            'Security group misconfigurations'
        ],
        impact: 'Infrastructure security score improved from 62% to 94%. Passed SOC 2 Type II audit.',
        technologies: ['AWS Security Hub', 'CloudTrail', 'GuardDuty', 'Config', 'Terraform', 'Prowler']
    },
    project6: {
        title: '💻 Security Automation Framework',
        date: 'August 2025',
        category: 'Development',
        client: 'Internal Project',
        description: 'Custom Python-based security automation framework for vulnerability scanning, reporting, and remediation tracking.',
        objectives: [
            'Automate vulnerability scanning',
            'Generate automated reports',
            'Track remediation progress',
            'Integrate with ticketing systems'
        ],
        methodology: [
            'Requirements gathering',
            'Framework architecture design',
            'API integration development',
            'Automated testing implementation',
            'Documentation and deployment'
        ],
        findings: [
            'Reduced manual scanning time by 75%',
            'Automated report generation saves 10 hours/week',
            'Improved remediation tracking accuracy',
            'Seamless JIRA integration implemented',
            'Custom dashboard for executive reporting'
        ],
        impact: 'Framework adopted by 5 enterprise clients, reducing their security operations costs by 40%.',
        technologies: ['Python', 'Flask', 'Nmap', 'OpenVAS', 'REST APIs', 'PostgreSQL', 'Docker']
    },
    project7: {
        title: '📱 Mobile App Security Testing',
        date: 'July 2025',
        category: 'Penetration Testing',
        client: 'Banking Institution',
        description: 'Comprehensive security assessment of Android and iOS mobile banking applications.',
        objectives: [
            'Test for OWASP Mobile Top 10 vulnerabilities',
            'Assess data storage security',
            'Evaluate authentication mechanisms',
            'Test for reverse engineering resistance'
        ],
        methodology: [
            'Static and dynamic analysis',
            'Reverse engineering and decompilation',
            'Runtime manipulation testing',
            'Network traffic analysis',
            'Cryptographic implementation review'
        ],
        findings: [
            'Insecure data storage in local databases',
            'Hardcoded API keys in application code',
            'Insufficient SSL pinning implementation',
            'Weak encryption for sensitive data',
            'Lack of root/jailbreak detection'
        ],
        impact: 'All vulnerabilities remediated. App achieved 4.8/5 security rating from independent auditors.',
        technologies: ['MobSF', 'Frida', 'Burp Suite', 'APKTool', 'Hopper', 'Charles Proxy']
    },
    project8: {
        title: '🏦 PCI DSS Compliance Audit',
        date: 'June 2025',
        category: 'Compliance',
        client: 'Payment Gateway Provider',
        description: 'Payment Card Industry Data Security Standard compliance assessment for payment processing platform.',
        objectives: [
            'Assess PCI DSS compliance status',
            'Identify security gaps',
            'Validate security controls',
            'Prepare for QSA audit'
        ],
        methodology: [
            'Cardholder data flow mapping',
            'Network segmentation review',
            'Access control testing',
            'Encryption validation',
            'Vulnerability scanning'
        ],
        findings: [
            'Network segmentation properly implemented',
            'Strong encryption for data in transit and at rest',
            'Multi-factor authentication enforced',
            'Quarterly vulnerability scans automated',
            'Incident response plan validated'
        ],
        impact: 'Client passed PCI DSS Level 1 audit with zero findings. Maintained compliance for 3 consecutive years.',
        technologies: ['PCI DSS v4.0', 'Nessus', 'Qualys', 'Network Segmentation Tools', 'SIEM']
    },
    project9: {
        title: '🌟 SecureSphere Platform',
        date: 'January 2026',
        category: 'Development',
        client: 'Educational Initiative',
        description: 'Full-stack cybersecurity learning platform with interactive labs, gamification, and professional services.',
        objectives: [
            'Create engaging learning platform',
            'Develop interactive cyber labs',
            'Implement gamification features',
            'Provide professional services portal'
        ],
        methodology: [
            'User experience research',
            'Full-stack development',
            'Interactive lab environment setup',
            'Backend API development',
            'Security best practices implementation'
        ],
        findings: [
            'Platform serves 1000+ active learners',
            '50+ interactive cybersecurity labs',
            'Gamification increased engagement by 200%',
            'Professional services booking system',
            'Responsive design for all devices'
        ],
        impact: 'Platform recognized as innovative cybersecurity education solution. Featured in industry publications.',
        technologies: ['Node.js', 'Express', 'HTML5', 'CSS3', 'JavaScript', 'Docker', 'AWS']
    }
};

// ===== OPEN PROJECT MODAL =====
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectData[projectId];

    if (!project) return;

    // Build modal content
    const content = `
    <div class="modal-header">
      <h2>${project.title}</h2>
      <div class="modal-meta">
        <span>📅 ${project.date}</span>
        <span>📂 ${project.category}</span>
        <span>👤 ${project.client}</span>
      </div>
      <div class="tags">
        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
      </div>
    </div>

    <h3>📋 Project Overview</h3>
    <p>${project.description}</p>

    <h3>🎯 Objectives</h3>
    <ul>
      ${project.objectives.map(obj => `<li>${obj}</li>`).join('')}
    </ul>

    <h3>🔬 Methodology</h3>
    <ul>
      ${project.methodology.map(method => `<li>${method}</li>`).join('')}
    </ul>

    <h3>🔍 Key Findings</h3>
    <ul>
      ${project.findings.map(finding => `<li>${finding}</li>`).join('')}
    </ul>

    <h3>💡 Impact</h3>
    <p>${project.impact}</p>
  `;

    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== CLOSE PROJECT MODAL =====
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('projectModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('portfolioContactForm');
const formMessage = document.getElementById('formMessage');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        projectType: document.getElementById('project').value,
        message: document.getElementById('message').value,
        source: 'portfolio'
    };

    // Disable submit button
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
    submitBtn.disabled = true;

    try {
        // Send to backend API
        const response = await fetch('http://localhost:3000/api/portfolio-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            // Success
            formMessage.className = 'form-message success';
            formMessage.innerHTML = `
        ✅ <strong>Thank you for reaching out!</strong><br>
        Your inquiry has been received. Ticket ID: <strong>${result.ticketId}</strong><br>
        We'll contact you at <strong>${formData.email}</strong> within 24 hours.
      `;
            contactForm.reset();
        } else {
            // Error
            formMessage.className = 'form-message error';
            formMessage.textContent = `❌ ${result.error || 'Failed to send message. Please try again.'}`;
        }
    } catch (error) {
        // Network error
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Network error. Please check your connection and try again.';
        console.error('Form submission error:', error);
    } finally {
        // Re-enable submit button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Hide message after 10 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 10000);
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMATE ON SCROLL =====
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all portfolio cards
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(card);
});

console.log('🛡️ SecureSphere Portfolio - Loaded Successfully');
