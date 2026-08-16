document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       1. GLOBAL RUNTIME READING HORIZON (SCROLL TRACKER PROGRESS BAR)
       ========================================================================== */
    const horizonBar = document.getElementById("horizonBar");
    if (horizonBar) {
        window.addEventListener("scroll", () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            horizonBar.style.width = scrolled + "%";
        });
    }

    /* ==========================================================================
       2. INTERFACE THEME ENGINE (DARK / LIGHT TOGGLE MULTI-MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const htmlElement = document.documentElement;

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem("tlc-theme-cache") || "dark";
        htmlElement.setAttribute("data-theme", savedTheme);

        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-theme");
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            
            htmlElement.setAttribute("data-theme", nextTheme);
            localStorage.setItem("tlc-theme-cache", nextTheme);
        });
    }

    /* ==========================================================================
       3. ARCHITECTURAL MODAL HAMBURGER DRAWER ACTION INTERFACES
       ========================================================================== */
    const hamburgerTrigger = document.getElementById("hamburgerTrigger");
    const modalDrawer = document.getElementById("modalDrawer");
    const drawerLinks = document.querySelectorAll(".drawer-link-item");

    if (hamburgerTrigger && modalDrawer) {
        const toggleDrawerState = () => {
            hamburgerTrigger.classList.toggle("is-open");
            modalDrawer.classList.toggle("is-active");
            document.body.style.overflow = modalDrawer.classList.contains("is-active") ? "hidden" : "";
        };

        hamburgerTrigger.addEventListener("click", toggleDrawerState);

        drawerLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburgerTrigger.classList.remove("is-open");
                modalDrawer.classList.remove("is-active");
                document.body.style.overflow = "";
            });
        });
    }

    /* ==========================================================================
       4. INTERSECTION TELEMETRY METRIC MONITORING & PROGRESS METRICS
       ========================================================================== */
    const revealTargets = document.querySelectorAll(".id-reveal");
    
    const animateMetricBars = (container) => {
        const progressNodes = container.querySelectorAll(".metric-progress-node");
        progressNodes.forEach(node => {
            const fillElement = node.querySelector(".metric-bar-fill");
            const percentageText = node.querySelector(".metric-percentage");
            const targetVal = parseInt(percentageText.getAttribute("data-target"), 10);
            
            if (fillElement) {
                fillElement.style.width = targetVal + "%";
            }
            
            if (percentageText) {
                let currentVal = 0;
                const counterInterval = setInterval(() => {
                    if (currentVal >= targetVal) {
                        clearInterval(counterInterval);
                    } else {
                        currentVal++;
                        percentageText.textContent = currentVal + "%";
                    }
                }, 15);
            }
        });
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-active");
                
                if (entry.target.id === "metrics") {
                    animateMetricBars(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.10,
        rootMargin: "0px 0px -40px 0px"
    });

    revealTargets.forEach(target => revealObserver.observe(target));

    /* ==========================================================================
       5. 3D MOUSE PARALLAX FRAME ROTATION ENGINE
       ========================================================================== */
    const caseNodes = document.querySelectorAll(".editorial-case-node");

    caseNodes.forEach(node => {
        node.addEventListener("mousemove", (e) => {
            const rect = node.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const midX = rect.width / 2;
            const midY = rect.height / 2;
            
            const tiltX = ((y - midY) / midY) * 4;
            const tiltY = ((midX - x) / midX) * 4;

            node.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.005, 1.005, 1.005)`;
        });

        node.addEventListener("mouseleave", () => {
            node.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    /* ==========================================================================
       6. SECURE ASYNC MAIL TRANSMISSION BRIDGE
       ========================================================================== */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector(".submit-btn");
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "TRANSMITTING BLUEPRINT...";
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById("formName").value,
                email: document.getElementById("formEmail").value,
                message: document.getElementById("formMessage").value
            };

            try {
                // Sends inquiry data seamlessly through relative active server environment paths
                const response = await fetch("/api/inquiry", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert("Verification Matrix Acknowledged. Blueprint emailed to studio desk successfully.");
                    contactForm.reset();
                } else {
                    alert("Server routing layer returned an error. Verify backend status configuration.");
                }
            } catch (error) {
                console.error("Transmission Exception Code:", error);
                alert("Network routing exception. Ensure your local server environment is active using your batch file launcher.");
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    /* ==========================================================================
       7. NAV ACTIVE STATE MIGRATION MONITOR
       ========================================================================== */
    const menuLinks = document.querySelectorAll(".nav-link");
    menuLinks.forEach(link => {
        link.addEventListener("click", function() {
            menuLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
