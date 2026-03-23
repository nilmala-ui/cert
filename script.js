document.addEventListener('DOMContentLoaded', () => {
    
    // --- State & DOM Elements ---
    const themeColorInput = document.getElementById('theme-color');
    const themeColorValue = document.getElementById('theme-color-value');
    const logoUpload = document.getElementById('logo-upload');
    const certLogo = document.getElementById('cert-logo');
    const removeLogoBtn = document.getElementById('remove-logo');
    const resetBtn = document.getElementById('reset-btn');
    
    // The main certificate wrapper and element
    const scaleWrapper = document.getElementById('wrapper');
    const certContainer = document.getElementById('certificate-container');
    const appLayout = document.querySelector('.app-layout');

    // Default Texts
    const defaults = {
        title: "Çertifikatë Pjesëmarrjeje",
        subtitle: "Përfundimi i Nivelit të Parë",
        text1: "Kjo çertifikatë i jepet",
        name: "Emri i Pjesëmarrësit",
        text2: "për pjesëmarrjen në nivelin e parë të serisë së ligjëratave:",
        course: "“Fikhu i Adhurimeve”",
        instructor: "Ligjëruar nga Hoxhë Dr. Rasim Haxha",
        date: "23 Mars 2026",
        seal: "Vula",
        sign: "",
        color: "#D4AF37"
    };

    // --- Window Resize Scaling Logic ---
    // Makes sure the certificate fits beautifully inside the workspace viewport
    function adjustScale() {
        const workspace = document.querySelector('.workspace');
        // Container fixed size is 297mm x 210mm (~ 1122px x 793px at standard logic matching our CSS)
        const certWidth = 1122; 
        const certHeight = 793;

        if (window.innerWidth <= 992) {
            // Mobile Scaling Logic: Scale to fit width, shrink-wrap height via negative margin trick
            const availableWidth = window.innerWidth - 30; // 15px margin on each side
            let scale = availableWidth / certWidth;
            scale = Math.min(Math.max(scale, 0.2), 1); // bounds
            
            scaleWrapper.style.transform = `scale(${scale})`;
            scaleWrapper.style.transformOrigin = 'top center';
            
            const heightDiff = certHeight - (certHeight * scale);
            scaleWrapper.style.marginBottom = `-${heightDiff}px`;
        } else {
            // Desktop Scaling Logic: Fit perfectly inside the viewport
            const availableHeight = workspace.clientHeight - 120; 
            const availableWidth = workspace.clientWidth - 80;
            
            const scaleX = availableWidth / certWidth;
            const scaleY = availableHeight / certHeight;
            let scale = Math.min(scaleX, scaleY) * 0.95;
            scale = Math.min(Math.max(scale, 0.3), 1);
            
            scaleWrapper.style.transform = `scale(${scale})`;
            scaleWrapper.style.transformOrigin = 'center center';
            scaleWrapper.style.marginBottom = '0';
        }
    }
    
    window.addEventListener('resize', adjustScale);
    // Initial call
    setTimeout(adjustScale, 100);

    // --- Personalization Handlers ---

    // 1. Theme Color
    function updateThemeColor(color) {
        document.documentElement.style.setProperty('--accent-color', color);
        themeColorValue.textContent = color.toUpperCase();
        themeColorInput.value = color;
        // Optionally update icons in panel to match
        document.querySelectorAll('.header-icon, .control-section h3 i').forEach(icon => {
            icon.style.color = color;
        });
    }

    themeColorInput.addEventListener('input', (e) => {
        updateThemeColor(e.target.value);
    });

    // 2. Pattern Selectors
    const patternBtns = document.querySelectorAll('.pattern-btn');
    // Encode SVGs natively as Base64 to prevent iOS Safari html2canvas crashing
    const btoaSafe = str => btoa(unescape(encodeURIComponent(str)));
    
    const patterns = {
        '1': `url('data:image/svg+xml;base64,${btoaSafe('<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" stroke-width="1.2" stroke-opacity="0.06" fill="none"><path d="M24 0 L56 0 L80 24 L80 56 L56 80 L24 80 L0 56 L0 24 Z"/><path d="M28 8 L52 8 L72 28 L72 52 L52 72 L28 72 L8 52 L8 28 Z"/></g></svg>')}')`,
        '2': `url('data:image/svg+xml;base64,${btoaSafe('<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" stroke-width="1.2" stroke-opacity="0.05" fill="none"><rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)"/><rect x="22" y="22" width="56" height="56"/></g></svg>')}')`,
        '3': `url('data:image/svg+xml;base64,${btoaSafe('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" stroke-width="1.5" stroke-opacity="0.05" fill="none"><path d="M30 0 L60 30 L30 60 L0 30 Z" /><path d="M15 15 L45 15 L45 45 L15 45 Z" /></g></svg>')}')`,
        '4': `url('data:image/svg+xml;base64,${btoaSafe('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000" stroke-opacity="0.06" stroke-width="1.5"><path d="M0 30 Q15 15 30 30 T60 30"/><path d="M0 30 Q15 45 30 30 T60 30"/><path d="M30 0 Q45 15 30 30 T30 60"/><path d="M30 0 Q15 15 30 30 T30 60"/></g></svg>')}')`,
        '5': `url('data:image/svg+xml;base64,${btoaSafe('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-opacity="0.03"><path d="M30 0l30 30-30 30L0 30z"/></g></svg>')}')`,
        '6': `url('data:image/svg+xml;base64,${btoaSafe('<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M15 0h10v15h15v10h-15v15h-10v-15h-15v-10h15z" stroke="#000" stroke-width="1.5" stroke-opacity="0.05" fill="none"/></svg>')}')`,
        '7': `url('data:image/svg+xml;base64,${btoaSafe('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" stroke-width="1.2" stroke-opacity="0.06" fill="none"><circle cx="30" cy="30" r="20"/><circle cx="0" cy="0" r="20"/><circle cx="60" cy="0" r="20"/><circle cx="0" cy="60" r="20"/><circle cx="60" cy="60" r="20"/></g></svg>')}')`,
        '8': `url('data:image/svg+xml;base64,${btoaSafe('<svg width="56" height="98" viewBox="0 0 56 98" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" stroke-width="1.2" stroke-opacity="0.06" fill="none"><path d="M28 16L0 0l0 32.7l28 16.3l28-16.3L56 0zM0 65.3l28 16.3l28-16.3l0-32.6l-28-16.3L0 32.7zM28 81.6l0 16.4M28 16.3l0-16.3"/></g></svg>')}')`,
        'none': 'none'
    };

    patternBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            patternBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            certContainer.style.backgroundImage = patterns[btn.getAttribute('data-pattern')];
        });
    });

    // 3. Logo Upload & Remove
    logoUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                certLogo.src = e.target.result;
                certLogo.style.display = 'inline-block';
                removeLogoBtn.style.display = 'inline-flex';
            }
            reader.readAsDataURL(file);
        }
    });

    removeLogoBtn.addEventListener('click', () => {
        certLogo.removeAttribute('src');
        certLogo.style.display = 'none';
        removeLogoBtn.style.display = 'none';
        logoUpload.value = ''; // reset input
    });

    // 4. Reset Defaults
    resetBtn.addEventListener('click', () => {
        if(confirm("Jeni i sigurt që doni të fshini ndryshimet dhe të ktheheni në të dhënat fillestare?")) {
            document.getElementById('c-title').innerText = defaults.title;
            document.getElementById('c-subtitle').innerText = defaults.subtitle;
            document.getElementById('c-text1').innerText = defaults.text1;
            document.getElementById('c-name').innerText = defaults.name;
            document.getElementById('c-text2').innerText = defaults.text2;
            document.getElementById('c-course').innerText = defaults.course;
            document.getElementById('c-instructor').innerText = defaults.instructor;
            document.getElementById('c-date').innerText = defaults.date;
            document.getElementById('c-seal').innerHTML = `<div class="seal-inner">${defaults.seal}</div>`;
            document.getElementById('c-sign').innerText = defaults.sign;
            
            updateThemeColor(defaults.color);
            removeLogoBtn.click(); // removes logo and hides btn
            
            // Reset pattern to default (1)
            document.querySelector('.pattern-btn[data-pattern="1"]').click();
        }
    });

    // --- Export Engine ---

    async function exportCertificate(format, btnElement) {
        let participantName = document.getElementById('c-name').innerText.trim();
        if (participantName === "" || participantName.includes("Emri i Pjesëmarrësit")) {
            const proceed = confirm("Emri i pjesëmarrësit nuk është ndryshuar ende. Doni të vazhdoni?");
            if(!proceed) return;
        }

        btnElement.classList.add('loading');
        
        // Prevent scroll offset bugs in html2canvas
        window.scrollTo(0, 0);

        // Cache original states
        const originalTransform = scaleWrapper.style.transform;
        const originalMargin = scaleWrapper.style.marginBottom;
        const originalTransition = scaleWrapper.style.transition;
        
        // Disable editables before capture to prevent Safari text-selection cursor crashes
        const editables = certContainer.querySelectorAll('[contenteditable="true"]');
        editables.forEach(el => el.setAttribute('contenteditable', 'false'));
        
        // Force layout reset without animating 
        scaleWrapper.style.transition = 'none';
        scaleWrapper.style.transform = 'none';
        scaleWrapper.style.marginBottom = '0';
        certContainer.classList.add('printing');

        // Give DOM multiple frames to completely settle layout thrashing on iOS
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
        await new Promise(r => setTimeout(r, 150)); 

        participantName = participantName.replace(/\s+/g, '_');
        if (participantName === "") participantName = "Pjesemarresi";
        const fileName = `Certifikate_${participantName}.${format}`;

        try {
            const exportScale = window.innerWidth <= 768 ? 1.5 : 2;
            
            // Using modern html-to-image library to completely bypass iOS Canvas Taint and Layout Bugs
            let dataUrl;
            const options = {
                pixelRatio: exportScale,
                backgroundColor: '#ffffff',
                filter: (node) => {
                    // Prevent DOM exceptions when html-to-image fetches empty images
                    if (node.tagName === 'IMG' && !node.getAttribute('src')) {
                        return false;
                    }
                    return true;
                },
                style: {
                    transform: 'none',
                    margin: '0'
                }
            };
            
            if (format === 'png') {
                dataUrl = await htmlToImage.toPng(certContainer, options);
            } else {
                dataUrl = await htmlToImage.toJpeg(certContainer, { ...options, quality: 0.98 });
            }

            if (format === 'pdf') {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('landscape', 'mm', 'a4');
                // A4 landscape is exactly 297mm x 210mm
                pdf.addImage(dataUrl, 'JPEG', 0, 0, 297, 210);
                pdf.save(fileName);
            } 
            else if (format === 'png' || format === 'jpg') {
                // Native iOS/Safari fallback to prevent direct programmatic download blocking
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                
                if (isIOS) {
                    const modal = document.createElement('div');
                    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';
                    
                    const hint = document.createElement('h3');
                    hint.innerText = 'Mbaj shtypur mbi foto për ta ruajtur';
                    hint.style.cssText = 'color:#fff;margin-bottom:20px;text-align:center;font-family:Inter,sans-serif;font-size:16px;';
                    
                    const img = new Image();
                    img.src = dataUrl;
                    img.style.cssText = 'max-width:100%;max-height:70vh;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.5);';
                    
                    const closeBtn = document.createElement('button');
                    closeBtn.innerText = 'Mbyll';
                    closeBtn.style.cssText = 'margin-top:30px;padding:12px 30px;background:#ef4444;color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer;';
                    closeBtn.onclick = () => document.body.removeChild(modal);
                    
                    modal.appendChild(hint);
                    modal.appendChild(img);
                    modal.appendChild(closeBtn);
                    document.body.appendChild(modal);
                } else {
                    const link = document.createElement('a');
                    link.download = fileName;
                    link.href = dataUrl;
                    link.click();
                }
            }
        } catch (error) {
            console.error("Gabim gjatë eksportimit:", error);
            let msg = error.message || error;
            if (error instanceof Event || msg.toString().includes('[object Event]')) {
                msg = "Network fetch error (Fontet ose Imazhet u refuzuan nga Safari. Ju lutemi ri-hapni plotësisht faqen).";
            }
            alert("Gabim gjatë gjenerimit:\n" + msg);
        } finally {
            certContainer.classList.remove('printing');
            editables.forEach(el => el.setAttribute('contenteditable', 'true'));
            
            scaleWrapper.style.transform = originalTransform; 
            scaleWrapper.style.marginBottom = originalMargin;
            
            setTimeout(() => {
                scaleWrapper.style.transition = originalTransition;
            }, 50);
            
            btnElement.classList.remove('loading');
        }
    }

    // Attach export events to buttons
    document.getElementById('export-pdf').addEventListener('click', function() {
        exportCertificate('pdf', this);
    });
    
    document.getElementById('export-png').addEventListener('click', function() {
        exportCertificate('png', this);
    });

    document.getElementById('export-jpg').addEventListener('click', function() {
        exportCertificate('jpg', this);
    });
});
