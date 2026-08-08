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
   TODAY'S CLASSES
   ========================= */

const classes = [
    {
        time: "12:40 – 1:30",
        name: "First Subject",
        room: "Room —"
    },

    {
        time: "1:30 – 2:15",
        name: "Second Subject",
        room: "Room —"
    },

    {
        time: "2:15 – 3:00",
        name: "Third Subject",
        room: "Room —"
    },

    {
        time: "3:00 – 3:20",
        name: "Break Time",
        room: "☕"
    },

    {
        time: "3:20 – 4:05",
        name: "Fourth Subject",
        room: "Room —"
    },

    {
        time: "4:05 – 4:50",
        name: "Fifth Subject",
        room: "Room —"
    },

    {
        time: "4:50 – 5:45",
        name: "Sixth Subject",
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

    openSchedule();

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
        "👀 YOU FOUND THE SECRET\n\n" +
        "There is no announcement here.\n" +
        "You were just curious. 😭"
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

                if (card.dataset.page === "activities") {
                    openActivities();
                    return;
                }

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

/* =========================
   ACTIVITIES POPUP
========================= */

async function openActivities() {

    const popup = document.getElementById("activitiesPopup");
    const list = document.getElementById("activityList");

    popup.classList.add("active");

    list.innerHTML = "<p>Loading activities...</p>";

    const { data, error } = await supabaseClient
        .from("activities")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) {
        console.error(error);

        list.innerHTML =
            "<p>❌ Unable to load activities.</p>";

        return;
    }

    if (!data || data.length === 0) {

        list.innerHTML = `
            <div class="no-activities">
                <p>🎉 No current activities!</p>
            </div>
        `;

        return;
    }

    list.innerHTML = "";

    data.forEach(activity => {

        const card = document.createElement("div");

        card.className = "activity-card";

        const title = document.createElement("h3");
        title.textContent = "📌 " + activity.title;

        const subject = document.createElement("p");
        subject.className = "activity-subject";
        subject.textContent = activity.subject || "";

        const description = document.createElement("p");
        description.textContent =
            activity.description || "";

        card.appendChild(title);
        card.appendChild(subject);
        card.appendChild(description);

        list.appendChild(card);
    });
}


function closeActivities() {

    document
        .getElementById("activitiesPopup")
        .classList
        .remove("active");
}


/* Close popup when clicking the dark background */

document.addEventListener("click", function(event) {

    const popup =
        document.getElementById("activitiesPopup");

    if (event.target === popup) {
        closeActivities();
    }

});
/* =========================
   SCHEDULE POPUP
========================= */

function openSchedule() {

    const popup =
        document.getElementById("schedulePopup");

    popup.classList.add("active");
}


function closeSchedule() {

    const popup =
        document.getElementById("schedulePopup");

    popup.classList.remove("active");
}


/* Close schedule popup when clicking dark background */

document.addEventListener("click", function(event) {

    const popup =
        document.getElementById("schedulePopup");

    if (event.target === popup) {
        closeSchedule();
    }

});
