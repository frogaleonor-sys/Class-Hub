/* =========================
   SUPABASE
   ========================= */

const SUPABASE_URL =
    "https://molcqxvhzntiqpaiopdi.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_Ft99Xk1hx7VrkWkYSQ2G8Q_By-1ZggD";


/* =========================
   SUPABASE CLIENT
   ========================= */

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================
   START
   ========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =========================
           ELEMENTS
           ========================= */

        const quickCards =
            document.querySelectorAll(
                ".quick-card"
            );

        const navButtons =
            document.querySelectorAll(
                ".nav-button"
            );

        const classContainer =
            document.getElementById(
                "today-classes"
            );

        const secretTrigger =
            document.getElementById(
                "secretTrigger"
            );

        const secretOverlay =
            document.getElementById(
                "secretOverlay"
            );

        const secretEnter =
            document.getElementById(
                "secretEnter"
            );

        const secretClose =
            document.getElementById(
                "secretClose"
            );


        /* =========================
           LOAD ANNOUNCEMENT
           ========================= */

        async function loadAnnouncement() {

            try {

                const {
                    data,
                    error
                } = await supabaseClient
                    .from("announcements")
                    .select("*")
                    .order(
                        "created_at",
                        {
                            ascending: false
                        }
                    )
                    .limit(1);


                if (error) {

                    console.error(
                        "Supabase error:",
                        error
                    );

                    return;
                }


                if (
                    !data ||
                    data.length === 0
                ) {

                    return;
                }


                const announcement =
                    data[0];


                const title =
                    document.getElementById(
                        "announcement-title"
                    );

                const message =
                    document.getElementById(
                        "announcement-text"
                    );


                if (title) {

                    title.textContent =
                        announcement.title;

                }


                if (message) {

                    message.textContent =
                        announcement.message;

                }


            } catch (error) {

                console.error(
                    "Could not load announcement:",
                    error
                );

            }

        }


        loadAnnouncement();


        /* =========================
           SAMPLE CLASSES
           ========================= */

        const classes = [
            {
                time: "7:00 AM",
                name: "Subject 1",
                room: "Room —"
            },

            {
                time: "8:30 AM",
                name: "Subject 2",
                room: "Room —"
            },

            {
                time: "10:00 AM",
                name: "Subject 3",
                room: "Room —"
            }
        ];


        /* =========================
           SHOW CLASSES
           ========================= */

        function showClasses() {

            if (!classContainer) {
                return;
            }


            classContainer.innerHTML = "";


            classes.forEach(
                classItem => {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "class-item";


                    item.innerHTML = `

                        <div class="class-time">
                            ${classItem.time}
                        </div>

                        <div class="class-info">

                            <div class="class-name">
                                ${classItem.name}
                            </div>

                            <div class="class-room">
                                ${classItem.room}
                            </div>

                        </div>

                    `;


                    classContainer.appendChild(
                        item
                    );

                }
            );

        }


        showClasses();


        /* =========================
           NORMAL NAVIGATION
           ========================= */

        function openPage(page) {

            if (page === "home") {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                return;
            }


            if (page === "schedule") {

                alert(
                    "📅 SCHEDULE\n\n" +
                    "Your class schedule will appear here."
                );

                return;
            }


            if (page === "activities") {

                alert(
                    "📚 ACTIVITIES\n\n" +
                    "Your activities will appear here."
                );

                return;
            }


            if (page === "deadlines") {

                alert(
                    "⏰ DEADLINES\n\n" +
                    "Your upcoming deadlines will appear here."
                );

                return;
            }


            if (page === "announcements") {

                alert(
                    "📢 ANNOUNCEMENTS\n\n" +
                    "Your announcements will appear here."
                );

                return;
            }


            if (page === "more") {

                alert(
                    "MORE FEATURES\n\n" +
                    "More features coming soon."
                );

            }

        }


        /* =========================
           QUICK CARDS
           ========================= */

        quickCards.forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        openPage(
                            card.dataset.page
                        );

                    }
                );

            }
        );


        /* =========================
           BOTTOM NAVIGATION
           ========================= */

        navButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        navButtons.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        openPage(
                            button.dataset.page
                        );

                    }
                );

            }
        );


        /* =========================
           SECRET EASTER EGG
           ========================= */

        let secretTaps = 0;

        let tapTimer = null;


        if (secretTrigger) {

            secretTrigger.addEventListener(
                "click",
                () => {

                    secretTaps++;


                    clearTimeout(
                        tapTimer
                    );


                    tapTimer =
                        setTimeout(
                            () => {

                                secretTaps = 0;

                            },
                            1800
                        );


                    if (
                        secretTaps === 4
                    ) {

                        secretTaps = 0;

                        clearTimeout(
                            tapTimer
                        );


                        if (
                            secretOverlay
                        ) {

                            secretOverlay.classList.add(
                                "show"
                            );

                            secretOverlay.setAttribute(
                                "aria-hidden",
                                "false"
                            );

                        }

                    }

                }
            );

        }


        /* =========================
           CLOSE SECRET
           ========================= */

        if (secretClose) {

            secretClose.addEventListener(
                "click",
                () => {

                    secretOverlay.classList.remove(
                        "show"
                    );

                    secretOverlay.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }
            );

        }


        /* =========================
           SECRET ENTER
           ========================= */

        if (secretEnter) {

            secretEnter.addEventListener(
                "click",
                () => {

                    alert(
                        "👀 SECRET PAGE\n\n" +
                        "We're building this next."
                    );

                }
            );

        }

    }
);
