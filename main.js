window.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector("header");

    // function to toggle mobile nav 
    const toggleMobileNav = () => {
        document.getElementById("mobileMenu").classList.toggle("show");
    }

    window.toggleMobileNav = toggleMobileNav;

    const runInitialAnimations = () => {
        const onLoadTl = gsap.timeline({ defaults: { ease: "power2.out" } });

        onLoadTl
        // animate header border with exxpansion
        .to(
            "header",
            {
                "--border-width": "100%",
                duration: 3,
            },
            // third augument- position parameter(starting all animations at the same time)
            0
        )
        // slide nav and sidebar items
        .from(
            ".desktop-nav a, .social-sidebar a",
            {
                y: -100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            },
            0
        )
        // animate sidebar border
        .to(
            ".social-sidebar",
            {
                "--border-height": "100%",
                duration: 10,
            }, 
            0
        )
        // fade in the hero heading
        .to(
            ".hero-content h1",
            {
                opacity: 1,
                duration: 1,
            },
            0
        )
        // animate the text stroke to solid color
        .to(
            ".hero-content h1",
            {
                delay: 0.5,
                duration: 1.2,
                color: "var(--sienna)",
                "-webkit-text-stroke": "0px var(--sienna)",
            },
            0
        )
        // slide in each line of the heading from the right 
        .from(
            ".hero-content .line",
            {
                x: 100,
                delay: 1,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            },
            0
        )
        // reveal the bottle wrapper
        .to(
            ".hero-bottle-wrapper",
            {
                opacity: 1,
                scale: 1,
                delay: 1.5,
                duration: 1.3,
                ease: "power3.out",
            },
            0
        )
        // pop-in stamp image
        .to(
            ".hero-stamp",
            {
                opacity: 1,
                scale: 1,
                delay: 2,
                duration: 0.2,
                ease: "back.out(3)",
            },
            0
        )
        // bounce effect for the stamp
        .to(
            ".hero-stamp",
            {
                y: "+=5",
                x: "-=3",
                repeat: 2,
                yoyo: true,
                duration: 0.05,
                ease: "power1.inOut"
            },
            0
        )
    }

    // main scrolleffect animations
    const pinAndAnimate = ({
        trigger, 
        endTrigger, 
        pin, 
        animations, 
        markers = false, 
        headerOffset = 0,
    }) => {
        // define scroll end position with header offset
        const end = `top top+=${headerOffset}`;

        // create a GSAP timeline connected to ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: `top top+=${headerOffset}`,
                endTrigger,
                end,
                scrub: true,
                pin,
                pinSpacing: false,
                markers: markers,
                invalidateOnRefresh: true,
            },
        });

        // loop through each animation object

        animations.forEach(({ target, vars, position = 0 }) => {
            tl.to(target, vars, position);
        });
    };

    // scroll animation for the bottle
    const setupScrollAnimations = () => {
        const headerOffset = header.offsetHeight - 1;

        // matchMedia is to handle responsive behaviours
        ScrollTrigger.matchMedia({
            "(min-width: 769px)": () => {
                // initial bottle animation based on scroll position
                pinAndAnimate({
                    trigger: ".hero",
                    endTrigger: ".section-intro",
                    pin: ".hero-bottle-wrapper",
                    animations: [
                        {
                            target: ".hero-bottle",
                            vars: { rotate: 0, scale: 0.8 }
                        },
                    ],
                    headerOffset,
                });
                // next scroll animation for the bottle
                pinAndAnimate({
                    trigger: ".section-intro",
                    endTrigger: ".timeline-entry:nth-child(even)",
                    pin: ".hero-bottle-wrapper",
                    animations: [
                        {
                            target: ".hero-bottle",
                            vars: { rotate: 10, scale: 0.7 },
                        },
                        {
                            target: ".hero-bottle-wrapper",
                            vars: { x: "30%" }
                        }
                    ],
                    markers: false,
                    headerOffset,
                });
                // next scroll animation for the bottle
                pinAndAnimate({
                    trigger: ".timeline-entry:nth-child(even)",
                    endTrigger: ".timeline-entry:nth-child(odd)",
                    pin: ".hero-bottle-wrapper",
                    animations: [
                        {
                            target: ".hero-bottle",
                            vars: { rotate: -10, scale: 0.7 },
                        },
                        {
                            target: ".hero-bottle-wrapper",
                            vars: { x: "-25%" }
                        }
                    ],
                    markers: false,
                    headerOffset,
                });
            },
            // mobile animations
            "(max-width: 768px)": () => {
                gsap.to(".hero-bottle-wrapper", {
                    opacity: 1,
                    duration: 1,
                    delay:0.5,
                });
            }
        })
    }

    runInitialAnimations();
    setupScrollAnimations();

    ScrollTrigger.refresh();
});