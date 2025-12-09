export function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.getElementById('hero');
    if (hero) {
        gsap.to(".parallax-bg", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.5
            }
        });

        gsap.utils.toArray('.hero-fade-up').forEach((elem, i) => {
            gsap.from(elem, {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.2 + (i * 0.15),
                ease: "power3.out"
            });
        });
    }

    gsap.utils.toArray('.gsap-reveal-left').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    gsap.utils.toArray('.gsap-reveal-right').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    gsap.utils.toArray('.gsap-fade-up').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
    });
}
