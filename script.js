/* =========================================
   INTERNSHIP DATA
========================================= */

const internships = [

    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechNova Solutions",
        domain: "Web Development",
        mode: "Remote",
        location: "India",
        duration: "3 Months",
        stipend: "₹12,000 / month",
        icon: "💻",
        description:
            "Build responsive web interfaces using HTML, CSS and JavaScript."
    },

    {
        id: 2,
        title: "AI / ML Intern",
        company: "NextGen AI Labs",
        domain: "AI & ML",
        mode: "Hybrid",
        location: "Chennai",
        duration: "6 Months",
        stipend: "₹18,000 / month",
        icon: "🤖",
        description:
            "Work on machine learning models and real-world AI applications."
    },

    {
        id: 3,
        title: "Data Science Intern",
        company: "DataSphere Analytics",
        domain: "Data Science",
        mode: "Remote",
        location: "India",
        duration: "4 Months",
        stipend: "₹15,000 / month",
        icon: "📊",
        description:
            "Analyze datasets and create meaningful insights using Python."
    },

    {
        id: 4,
        title: "UI/UX Design Intern",
        company: "Creative Pixel Studio",
        domain: "UI/UX Design",
        mode: "On-site",
        location: "Bengaluru",
        duration: "3 Months",
        stipend: "₹10,000 / month",
        icon: "🎨",
        description:
            "Design intuitive digital experiences and user-friendly interfaces."
    },

    {
        id: 5,
        title: "Cyber Security Intern",
        company: "SecureNet Technologies",
        domain: "Cyber Security",
        mode: "Hybrid",
        location: "Chennai",
        duration: "6 Months",
        stipend: "₹16,000 / month",
        icon: "🔐",
        description:
            "Learn security testing, vulnerability assessment and cyber defense."
    },

    {
        id: 6,
        title: "Cloud Engineering Intern",
        company: "CloudWorks India",
        domain: "Cloud Computing",
        mode: "Remote",
        location: "India",
        duration: "4 Months",
        stipend: "₹14,000 / month",
        icon: "☁️",
        description:
            "Work with cloud infrastructure, deployment and DevOps tools."
    },

    {
        id: 7,
        title: "Java Developer Intern",
        company: "CodeCraft Technologies",
        domain: "Web Development",
        mode: "On-site",
        location: "Chennai",
        duration: "3 Months",
        stipend: "₹11,000 / month",
        icon: "☕",
        description:
            "Develop backend applications using Java and object-oriented programming."
    },

    {
        id: 8,
        title: "Machine Learning Intern",
        company: "VisionTech Labs",
        domain: "AI & ML",
        mode: "Remote",
        location: "India",
        duration: "5 Months",
        stipend: "₹20,000 / month",
        icon: "🧠",
        description:
            "Train and evaluate machine learning models for real-world problems."
    },

    {
        id: 9,
        title: "Product Designer Intern",
        company: "DesignHub",
        domain: "UI/UX Design",
        mode: "Hybrid",
        location: "Bengaluru",
        duration: "4 Months",
        stipend: "₹13,000 / month",
        icon: "✨",
        description:
            "Create wireframes, prototypes and modern product experiences."
    }

];


/* =========================================
   DOM ELEMENTS
========================================= */

const searchInput =
    document.getElementById("searchInput");

const domainFilter =
    document.getElementById("domainFilter");

const locationFilter =
    document.getElementById("locationFilter");

const internshipGrid =
    document.getElementById("internshipGrid");

const resultCount =
    document.getElementById("resultCount");

const emptyState =
    document.getElementById("emptyState");

const loadingState =
    document.getElementById("loadingState");

const errorState =
    document.getElementById("errorState");

const clearFilters =
    document.getElementById("clearFilters");

const emptyClearButton =
    document.getElementById("emptyClearButton");

const retryButton =
    document.getElementById("retryButton");


/* =========================================
   STATE
========================================= */

let data = [];

let hasError = false;


/* =========================================
   INITIALIZE
========================================= */

function initializeApp() {

    try {

        loadingState.hidden = false;
        errorState.hidden = true;
        emptyState.hidden = true;

        internshipGrid.innerHTML = "";

        /*
         * Simulates loading data from an API.
         * In a real application this could be fetch().
         */

        setTimeout(() => {

            try {

                data = [...internships];

                loadingState.hidden = true;

                renderInternships();

            } catch (error) {

                showError();

            }

        }, 600);

    } catch (error) {

        showError();

    }

}


/* =========================================
   RENDER INTERNSHIPS
========================================= */

function renderInternships() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedDomain =
        domainFilter.value;

    const selectedLocation =
        locationFilter.value;


    const filteredInternships =
        data.filter(internship => {

            const matchesSearch =
                internship.title
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                internship.company
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                internship.location
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                internship.domain
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesDomain =
                selectedDomain === "all"
                ||
                internship.domain === selectedDomain;


            const matchesLocation =
                selectedLocation === "all"
                ||
                internship.mode === selectedLocation;


            return (
                matchesSearch &&
                matchesDomain &&
                matchesLocation
            );

        });


    internshipGrid.innerHTML = "";


    if (filteredInternships.length === 0) {

        emptyState.hidden = false;

    } else {

        emptyState.hidden = true;

        filteredInternships.forEach(
            internship => {

                const card =
                    createInternshipCard(internship);

                internshipGrid.appendChild(card);

            }
        );

    }


    resultCount.textContent =
        `${filteredInternships.length} internship${
            filteredInternships.length !== 1
                ? "s"
                : ""
        } found`;

}


/* =========================================
   CREATE CARD
========================================= */

function createInternshipCard(internship) {

    const article =
        document.createElement("article");

    article.className =
        "internship-card";


    article.innerHTML = `

        <div class="card-top">

            <div
                class="company-logo"
                aria-hidden="true"
            >
                ${internship.icon}
            </div>

            <span class="domain-badge">
                ${internship.domain}
            </span>

        </div>


        <h3>
            ${internship.title}
        </h3>


        <p class="company-name">
            ${internship.company}
        </p>


        <div class="card-details">

            <span>
                📍
                <span>
                    ${internship.location}
                </span>
            </span>

            <span>
                🏠
                <span>
                    ${internship.mode}
                </span>
            </span>

            <span>
                ⏱️
                <span>
                    ${internship.duration}
                </span>
            </span>

        </div>


        <p class="card-description">
            ${internship.description}
        </p>


        <div class="card-bottom">

            <span class="stipend">
                ${internship.stipend}
            </span>

            <button
                type="button"
                class="apply-btn"
                aria-label="Apply for ${internship.title} at ${internship.company}"
                data-id="${internship.id}"
            >
                Apply
            </button>

        </div>

    `;


    const applyButton =
        article.querySelector(".apply-btn");


    applyButton.addEventListener(
        "click",
        () => {

            alert(
                `Application started for ${internship.title} at ${internship.company}.`
            );

        }
    );


    return article;

}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    renderInternships
);


/* =========================================
   DOMAIN FILTER
========================================= */

domainFilter.addEventListener(
    "change",
    renderInternships
);


/* =========================================
   LOCATION FILTER
========================================= */

locationFilter.addEventListener(
    "change",
    renderInternships
);


/* =========================================
   CLEAR FILTERS
========================================= */

function resetFilters() {

    searchInput.value = "";

    domainFilter.value = "all";

    locationFilter.value = "all";

    renderInternships();

    searchInput.focus();

}


clearFilters.addEventListener(
    "click",
    resetFilters
);


emptyClearButton.addEventListener(
    "click",
    resetFilters
);


/* =========================================
   ERROR STATE
========================================= */

function showError() {

    loadingState.hidden = true;

    internshipGrid.innerHTML = "";

    emptyState.hidden = true;

    errorState.hidden = false;

    resultCount.textContent =
        "Unable to load internships.";

}


/* =========================================
   RETRY
========================================= */

retryButton.addEventListener(
    "click",
    () => {

        errorState.hidden = true;

        initializeApp();

    }
);


/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * Press "/" to quickly focus search.
         */

        if (
            event.key === "/" &&
            document.activeElement !== searchInput
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);


/* =========================================
   START APPLICATION
========================================= */

initializeApp();