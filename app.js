// -----------------------------------------------------
// Batter Analyzer - app.js
// Backend-only, no CSV preload
// -----------------------------------------------------

// -------------------------------
// Display League Averages XP + Overall Score
// -------------------------------

const season = 2026;
loadBatterOfDay(season);

// =====================================================
// ALL ACCESS - TEST MODE
// =====================================================

// true  = simulate Free Trial
// false = simulate All Access

const TEST_FREE_MODE = false;


// ------------------------------
// Access Helper
// ------------------------------

function hasAllAccess() {
    return !TEST_FREE_MODE;
}


// ------------------------------
// Premium Feature Gate
// ------------------------------

function requireAllAccess(featureName) {

    if (hasAllAccess()) {
        return true;
    }

    alert(
        `${featureName} is available with TimBaseball All Access.`
    );

    return false;
}

// ------------------------------
// Update Access UI
// ------------------------------

function updateAccessUI() {

    const allAccess = hasAllAccess();
    console.log(
    "ACCESS UI FIRED",
    "hasAllAccess:",
    hasAllAccess()
);

// ------------------------------
// Premium Buttons
// ------------------------------

const premiumButtons = [
    document.getElementById("trendBtn"),
    document.getElementById("compareBtn"),
    document.getElementById("leadersBtn")
];

premiumButtons.forEach(button => {

    if (!button) return;

    if (allAccess) {
        button.classList.remove("premium-locked");
    } else {
        button.classList.add("premium-locked");
    }
});


    // ------------------------------
    // All Access
    // ------------------------------

    if (allAccess) {
        return;
    }


    // ------------------------------
    // Park Adjusted
    // ------------------------------

    const adjustedEl =
        document.getElementById("parkAdjustedOverall");

    const adjustmentEl =
        document.getElementById("parkAdjustment");

    const venueEl =
        document.getElementById("parkVenue");

    const factorEl =
        document.getElementById("parkFactor");

    if (adjustedEl) {
        adjustedEl.innerHTML = `
            <span class="premium-value-lock">
                🔒
            </span>
        `;
    }

    if (adjustmentEl) {

        adjustmentEl.textContent = "ALL ACCESS";

        adjustmentEl.classList.remove(
            "positive",
            "negative",
            "neutral"
        );

        adjustmentEl.classList.add("premium-label");
    }

    if (venueEl) {
        venueEl.textContent = "Unlock Park Analysis";
    }

    if (factorEl) {
        factorEl.textContent = "";
    }


    // ------------------------------
    // Percentile
    // ------------------------------

    const percentileEl =
        document.getElementById("overallPercentile");

    if (percentileEl) {

        percentileEl.innerHTML = `
            <div class="percentile-premium-wrap">

                <span class="percentile-premium-lock">
                    🔒
                </span>

                <span class="percentile-premium-label">
                    ALL ACCESS
                </span>

            </div>
        `;
    }


    // ------------------------------
    // What to Watch
    // ------------------------------

    const watchGrid =
        document.getElementById("watchGrid");

    if (watchGrid) {

        watchGrid.innerHTML = `
            <div class="watch-premium-lock">

                <div class="watch-premium-icon">
                    🔒
                </div>

                <div class="watch-premium-badge">
                    ALL ACCESS
                </div>

                <div class="watch-premium-text">
                    Unlock What to Watch Analysis
                </div>

            </div>
        `;
    }

// ------------------------------
// Fantasy Edge
// ------------------------------

const fantasyPremiumLock =
    document.getElementById("fantasyPremiumLock");

const fantasyPremiumContent =
    document.getElementById("fantasyPremiumContent");

console.log(
    "FANTASY ACCESS:",
    "allAccess =", allAccess,
    "lockFound =", !!fantasyPremiumLock,
    "contentFound =", !!fantasyPremiumContent
);

if (fantasyPremiumLock && fantasyPremiumContent) {

    if (allAccess) {

        fantasyPremiumLock.hidden = true;
        fantasyPremiumContent.hidden = false;

    } else {

        fantasyPremiumLock.hidden = false;
        fantasyPremiumContent.hidden = true;
    }
}

}

// -------------------------------
// Safe helpers
// -------------------------------
function safeFixed(value, digits = 3) {
    return (value != null && !isNaN(value))
        ? Number(value).toFixed(digits)
        : "--";
}

function safeScore(value) {
    return (value != null && !isNaN(value))
        ? Number(value)
        : 0;
}

// -------------------------------
// Convert Numbers to Ordinal Strings
// -------------------------------
function toOrdinal(n) {
    const s = ["th", "st", "nd", "rd"],
          v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// -------------------------------
// Convert Name to Title Case (Player Tab)
// -------------------------------
function toTitleCase(str) {

    const initials = new Set([
        "AJ",
        "BJ",
        "CJ",
        "DJ",
        "JJ",
        "JT",
        "TJ",
        "JR"
    ]);

    return str
        .split(" ")
        .map(word =>
            word.split("-")
                .map(part => {

                    const upper = part.toUpperCase();

                    // Only uppercase known initials
                    if (initials.has(upper)) {
                        return upper;
                    }

                    return (
                        part.charAt(0).toUpperCase() +
                        part.slice(1).toLowerCase()
                    );
                })
                .join("-")
        )
        .join(" ");
}




// =====================================================
// Utility: Normalize name to match R script (First Last)
// =====================================================
function normalizeNameFrontend(x) {
    return x
        .normalize("NFKD")               // decompose accents
        .replace(/[\u0300-\u036f]/g, "") // remove accent marks ONLY
        .replace(/[,*#†+]/g, "")         // remove junk symbols
        .replace(/\./g, "")              // remove periods
        .replace(/\s+/g, " ")
        .trim();
}

// --------------------------------------
// MLB Team Color Map
// --------------------------------------

const teamColors = {
    ARI: ["#A71930", "#000000"],
    ATH: ["#003831", "#EFB21E"],
    ATL: ["#CE1141", "#13274F"],
    BAL: ["#DF4601", "#000000"],
    BOS: ["#BD3039", "#0C2340"],

    CHC: ["#0E3386", "#CC3433"],
    CWS: ["#000000", "#C4CED4"],
    CIN: ["#C6011F", "#000000"],
    CLE: ["#E31937", "#0C2340"],
    COL: ["#33006F", "#C4CED4"],

    DET: ["#0C2340", "#FFFFFF"],
    HOU: ["#002D62", "#EB6E1F"],
    KCR:  ["#004687", "#BD9B60"],
    LAA: ["#BA0021", "#003263"],
    LAD: ["#FFFFFF", "#005A9C"],

    MIA: ["#00A3E0", "#000000"],
    MIL: ["#12284B", "#FFC52F"],
    MIN: ["#002B5C", "#D31145"],
    NYM: ["#002D72", "#FF5910"],
    NYY: ["#0C2340", "#FFFFFF"],

    PHI: ["#E81828", "#002D72"],
    PIT: ["#000000", "#FDB827"],
    SDP:  ["#4A2C1B", "#FFC425"],
    SFG:  ["#FD5A1E", "#000000"],
    SEA: ["#0C2C56", "#005C5C"],

    STL: ["#FFFFFF", "#C41E3A"],
    TBR:  ["#092C5C", "#8FBCE6"],
    TEX: ["#003278", "#C0111F"],
    TOR: ["#134A8E", "#6BAED6"],
    WSN: ["#AB0003", "#14225A"]
};


// --------------------------------------
// Update Team Color Panel
// --------------------------------------

function updateTeamColorPanel(team) {

    const panel = document.getElementById("teamColorPanel");

    if (!panel) return;

    const primary =
        panel.querySelector(".team-color-primary");

    const secondary =
        panel.querySelector(".team-color-secondary");

    if (!primary || !secondary) return;

    const teamCode =
        String(team || "")
            .trim()
            .toUpperCase();

    const colors = teamColors[teamCode];

    // Neutral fallback
    if (!colors) {
        primary.style.backgroundColor = "#d9dee5";
        secondary.style.backgroundColor = "#eef1f4";
        return;
    }

    primary.style.backgroundColor = colors[0];
    secondary.style.backgroundColor = colors[1];
}


// --------------------------------------
// Reset Team Color Panel
// --------------------------------------

function resetTeamColorPanel() {

    const panel = document.getElementById("teamColorPanel");

    if (!panel) return;

    const primary =
        panel.querySelector(".team-color-primary");

    const secondary =
        panel.querySelector(".team-color-secondary");

    if (primary) {
        primary.style.backgroundColor = "#d9dee5";
    }

    if (secondary) {
        secondary.style.backgroundColor = "#eef1f4";
    }
}

// -------------------------------
// Team Display Helpers
// -------------------------------
function formatTeamDisplay(team) {
    const code = String(team || "").trim().toUpperCase();

    // Standard single-team code
    if (teamColors[code]) {
        return code;
    }

    // Multi-team Stathead code
    const teams = Object.keys(teamColors);
    const matches = [];

    let remaining = code;

    while (remaining.length > 0) {
        const match = teams.find(team =>
            remaining.startsWith(team)
        );

        if (!match) {
            return code;
        }

        matches.push(match);
        remaining = remaining.slice(match.length);
    }

    return matches.join("/");
}

function getTeamColorCode(team) {
    const display = formatTeamDisplay(team);

    if (!display.includes("/")) {
        return display;
    }

    const teams = display.split("/");

    // Last team = most recent/current team
    return teams[teams.length - 1];
}

// -------------------------------
// Similar Profiles
// -------------------------------
function updateSimilarProfiles(profiles) {

    const container =
        document.getElementById("similarProfiles");

    if (!container) return;

    if (!Array.isArray(profiles) || profiles.length === 0) {
        resetSimilarProfiles();
        return;
    }

const topThree = profiles.slice(0, 3);

container.innerHTML = topThree.map(profile => {

    const rawTeam = String(profile.Team || "").trim().toUpperCase();

    const displayTeam = formatTeamDisplay(rawTeam);
    const colorTeam = getTeamColorCode(rawTeam);

    const colors =
        teamColors[colorTeam] || ["#d9dee5", "#eef1f4"];

    const overall = Number(profile.Overall);
    const xp = Number(profile.XP);

    return `
        <div class="similar-profile-card">
            <div class="similar-profile-name-row">
                <span class="similar-profile-colors">
                    <span style="background:${colors[0]}"></span>
                    <span style="background:${colors[1]}"></span>
                </span>

                <div>
                    <div class="similar-profile-name">${profile.Player}</div>
                    <div class="similar-profile-team">${displayTeam}</div>
                </div>
            </div>

            <div class="similar-profile-stats">
                <div class="similar-profile-stat">
                    OVERALL
                    <strong>${overall.toFixed(1)}</strong>
                </div>

                <div class="similar-profile-stat">
                    XP
                    <strong>${Math.round(xp)}</strong>
                </div>
            </div>
        </div>
    `;
}).join("");
}

function resetSimilarProfiles() {

    const container =
        document.getElementById("similarProfiles");

    if (!container) return;

    container.innerHTML = `
        <div class="similar-profile-card placeholder"></div>
        <div class="similar-profile-card placeholder"></div>
        <div class="similar-profile-card placeholder"></div>
    `;
}

// -------------------------------
// Utility: Fetch batter data
// -------------------------------
async function loadBatter(name, season, silent = false) {
    const clean = normalizeNameFrontend(name);

    const url = `https://batter-analyzer-backend.onrender.com/api/batters?name=${encodeURIComponent(clean)}&season=${season}`;
    const res = await fetch(url);

    if (!res.ok) {
        console.error("Batter fetch failed", await res.text());
        return null;
    }

    const data = await res.json();

// ⭐ Normalize backend output: ALWAYS return an array
const arr = Array.isArray(data) ? data : [data];

// Similar Profiles
if (!silent && arr.length > 0) {
    updateSimilarProfiles(arr[0].SimilarProfiles);
}

    // ⭐ Only update tab if NOT silent
if (!silent && arr && arr.length > 0) {
    const rawName = arr[0].Name || clean;
    const playerName = toTitleCase(rawName);
    const team = arr[0].Team || "";
const displayTeam = formatTeamDisplay(team);
const colorTeam = getTeamColorCode(team);

    document.getElementById("playerTab").textContent =
        `${playerName}${displayTeam ? " | " + displayTeam : ""} (${season})`;

    updateTeamColorPanel(colorTeam);
}

return arr;


}


// -------------------------------
// Battery fill updater
// -------------------------------
function updateBattery(id, score) {
    const el = document.getElementById(id);
    if (!el) return;

    const fill = (score / 10) * 100;

    let color;
    if (score < 3) color = "#d50000";
    else if (score < 5.5) color = "#ff9800";
    else if (score < 7.5) color = "#ffb400";
    else color = "#00c853";

    el.style.setProperty("--fill", `${fill}%`);
    el.style.setProperty("--color", color);
}

function updateOverall(score) {
    document.getElementById("overallScore").textContent = safeFixed(score, 1);
    updateBattery("battery-overall", safeScore(score));
}


// -------------------------------
// Universal metric updater
// -------------------------------
function updateMetric(rawId, batteryId, scoreId, rawValue, scoreValue) {
    document.getElementById(rawId).textContent = rawValue;
    document.getElementById(scoreId).textContent = safeFixed(scoreValue, 1);
    updateBattery(batteryId, safeScore(scoreValue));
}

// -------------------------------
// Individual metric wrappers (Batting 5‑metric model)
// -------------------------------
function updateBA(raw, score)      { updateMetric("raw-ba",    "battery-ba",    "score-ba",    stripZero(raw), score); }
function updateOBP(raw, score)     { updateMetric("raw-obp",   "battery-obp",   "score-obp",   stripZero(raw), score); }
function updateSLG(raw, score)     { updateMetric("raw-slg",   "battery-slg",   "score-slg",   stripZero(raw), score); }
function updateKpct(raw, score)    { updateMetric("raw-kpct",  "battery-kpct",  "score-kpct",  raw, score); }
function updateBBpct(raw, score)   { updateMetric("raw-bbpct", "battery-bbpct", "score-bbpct", raw, score); }


// -------------------------------
// Overall score + tier
// -------------------------------
function updateOverall(score) {

    const numericScore = safeScore(score);

    document.getElementById("overallScore").textContent =
        safeFixed(score, 1);

    updateBattery(
        "battery-overall",
        numericScore
    );

    // Overall gauge: 0–10 → 0–100%
    const overallPercent = Math.max(
        0,
        Math.min(
            100,
            (numericScore / 10) * 100
        )
    );

    // Keep a tiny visible fill at the bottom of the scale
    const overallVisualFill =
        Math.max(3, overallPercent);

    const overallMeter =
        document.getElementById("overallMeter");

    if (overallMeter) {
        overallMeter.style.width =
            `${overallVisualFill}%`;
    }
}


function updateXP(xp) {

    document.getElementById("xpScore").textContent =
        safeFixed(xp, 0);

    const numericXP = Number(xp);

    // XP display gauge:
    // 950 = 0%
    // 1100 = 50%
    // 1250 = 100%

    const xpMin = 950;
    const xpMax = 1250;

    const xpPercent = Math.max(
        0,
        Math.min(
            100,
            ((numericXP - xpMin) / (xpMax - xpMin)) * 100
        )
    );

    // Below the floor still gets a tiny visible fill
    const xpVisualFill =
        Math.max(3, xpPercent);

    const xpMeter =
        document.getElementById("xpMeter");

    if (xpMeter) {
        xpMeter.style.width =
            `${xpVisualFill}%`;
    }
}

// -------------------------------
// Park Adjusted Overall
// -------------------------------
function updateParkAdjusted(p) {

    const adjustedEl =
        document.getElementById("parkAdjustedOverall");

    const adjustmentEl =
        document.getElementById("parkAdjustment");

    const venueEl =
        document.getElementById("parkVenue");

    const factorEl =
        document.getElementById("parkFactor");


    // -------------------------------
    // Free Trial Lock
    // -------------------------------

    if (!hasAllAccess()) {

        adjustedEl.innerHTML = `
            <span class="premium-value-lock">
                🔒
            </span>
        `;

        adjustmentEl.textContent =
            "ALL ACCESS";

        adjustmentEl.classList.remove(
            "positive",
            "negative",
            "neutral"
        );

        adjustmentEl.classList.add(
            "premium-label"
        );

        venueEl.textContent =
            "Unlock Park Analysis";

        factorEl.textContent = "";

        return;
    }


    // -------------------------------
    // Missing / unmatched park data
    // -------------------------------

    if (
        p.ParkAdjustedOverall == null ||
        isNaN(Number(p.ParkAdjustedOverall))
    ) {

        adjustedEl.textContent = "--";
        adjustmentEl.textContent = "";

        adjustmentEl.classList.remove(
            "positive",
            "negative",
            "neutral",
            "premium-label"
        );

        venueEl.textContent = "--";
        factorEl.textContent = "--";

        return;
    }


    const adjusted =
        Number(p.ParkAdjustedOverall);

    const change =
        Number(p.ParkAdjustment);


    // Adjusted Overall
    adjustedEl.textContent =
        adjusted.toFixed(1);


    // Adjustment badge
    adjustmentEl.classList.remove(
        "positive",
        "negative",
        "neutral",
        "premium-label"
    );


    if (!isNaN(change)) {

        adjustmentEl.textContent =
            `${change > 0 ? "+" : ""}${change.toFixed(1)}`;

        if (change > 0.05) {

            adjustmentEl.classList.add(
                "positive"
            );

        } else if (change < -0.05) {

            adjustmentEl.classList.add(
                "negative"
            );

        } else {

            adjustmentEl.classList.add(
                "neutral"
            );
        }

    } else {

        adjustmentEl.textContent = "";
    }


    // Park context
    venueEl.textContent =
        p.ParkVenue || "--";

    factorEl.textContent =
        p.ParkFactor != null &&
        !isNaN(Number(p.ParkFactor))
            ? `Park Factor: ${Number(p.ParkFactor).toFixed(0)}`
            : "--";
}


// -------------------------------
// Tier → CSS class mapping
// -------------------------------
function getTierClass(tier) {
    switch (tier) {
        case "Elite": return "tier-great";
        case "Impact": return "tier-good";
        case "Solid": return "tier-fair";
        case "Developing": return "tier-average";
        case "Limited": return "tier-belowavg";
        default: return "";
    }
}

// -------------------------------
// Get Tier (batting version)
// -------------------------------
function getBatterTier(score) {
    if (score >= 8.5) return "Elite";
    if (score >= 7.0) return "Impact";
    if (score >= 5.5) return "Solid";
    if (score >= 4.0) return "Developing";

    return "Limited";
}

// -------------------------------
// Tier assignment (batting version)
// -------------------------------
function updateTier(score) {

    const tier = getBatterTier(score);

    document.getElementById("overallTier").innerHTML =
        `<span class="tier-badge ${getTierClass(tier)}">${tier}</span>`;
}

// -------------------------------
// Hitter Archetype
// -------------------------------
function updateArchetype(p) {

    const archetypeEl =
        document.getElementById("playerArchetype");

    const matchEl =
        document.getElementById("playerArchetypeMatch");

    if (!archetypeEl || !matchEl) return;

    archetypeEl.textContent =
        p.Archetype || "--";

    matchEl.textContent =
        p.ArchetypeMatch || "--";
}

// -------------------------------
// Scouting note generator (Batting 5‑metric model)
// -------------------------------
function updateScoutingNote(p) {
    const strengths = [];
    const concerns = [];

    // BA
    if (p.BA >= 0.300) strengths.push("premium contact ability");
    else if (p.BA >= 0.270) strengths.push("above‑average hit tool");
    else if (p.BA < 0.240) concerns.push("inconsistent contact quality");

    // OBP
    if (p.OBP >= 0.380) strengths.push("elite on‑base skill");
    else if (p.OBP >= 0.340) strengths.push("strong plate discipline");
    else if (p.OBP < 0.300) concerns.push("limited on‑base production");

    // SLG
    if (p.SLG >= 0.550) strengths.push("impact power production");
    else if (p.SLG >= 0.450) strengths.push("workable gap power");
    else if (p.SLG < 0.380) concerns.push("below‑average impact on contact");

    // K%
    if (p.Kpct <= 18) strengths.push("advanced bat‑to‑ball skill");
    else if (p.Kpct <= 24) strengths.push("manageable swing‑and‑miss profile");
    else if (p.Kpct > 30) concerns.push("high swing‑and‑miss rate that may limit consistency");

    // BB%
    if (p.BBpct >= 12) strengths.push("plus walk generation");
    else if (p.BBpct >= 8) strengths.push("solid underlying discipline");
    else if (p.BBpct < 5) concerns.push("limited walk production");

    let note = "";

    // NEW: dead‑zone fallback
    if (!strengths.length && !concerns.length) {
        note = "Neutral underlying profile with no standout strengths or red flags.";
    } else if (strengths.length && !concerns.length) {
        note = "Profile built on " +
            strengths.join(", ").replace(/, ([^,]*)$/, " and $1") + ".";
    } else if (!strengths.length && concerns.length) {
        note = "Concerns include " +
            concerns.join(", ").replace(/, ([^,]*)$/, " and $1") + ".";
    } else {
        note = "Shows " +
            strengths.join(", ").replace(/, ([^,]*)$/, " and $1") +
            " but " +
            concerns.join(", ").replace(/, ([^,]*)$/, " and $1") +
            ".";
    }

    document.getElementById("scoutingNote").innerHTML = note;
}


// -------------------------------
// XP Score Function
// -------------------------------
function computeBatterXP(p) {
    if (!p) return null;

    return (
        (p.BA * 1000) +
        (p.OBP * 1000) +
        (p.SLG * 1000) +
        (p.BBpct * 2) -
        (p.Kpct * 1.5)
    );
}


// -------------------------------
// Weighted Overall Score (Batting 5‑metric model)
// -------------------------------
function computeWeightedOverall({
    baScore,
    obpScore,
    slgScore,
    kpctScore,
    bbpctScore
}) {
    return (
        baScore   * 0.25 +   // contact
        obpScore  * 0.25 +   // discipline / on-base
        slgScore  * 0.25 +   // power
        kpctScore * 0.15 +   // bat-to-ball
        bbpctScore* 0.10     // walk skill
    );
}

function clamp(x, min, max) {
    return Math.max(min, Math.min(max, x));
}


// ------------------------------
// Scoring functions (Batting 5‑metric model)
// ------------------------------

// BA: .300 = elite, .240 = fringe
function scoreBA(ba) {
    const score = 10 * (ba - 0.240) / (0.300 - 0.240);
    return clamp(score, 0, 10);
}

// OBP: .380 = elite, .300 = fringe
function scoreOBP(obp) {
    const score = 10 * (obp - 0.300) / (0.380 - 0.300);
    return clamp(score, 0, 10);
}

// SLG: .550 = elite, .380 = fringe
function scoreSLG(slg) {
    const score = 10 * (slg - 0.380) / (0.550 - 0.380);
    return clamp(score, 0, 10);
}

// K%: lower is better (reverse scale)
function scoreKpct(kpct) {
    const score = 10 * (30 - kpct) / (30 - 15);
    return clamp(score, 0, 10);
}

// BB%: higher is better
function scoreBBpct(bbpct) {
    const score = 10 * (bbpct - 5) / (12 - 5);
    return clamp(score, 0, 10);
}

// -------------------------------
// Utility helpers
// -------------------------------
function clamp(x, min, max) {
    return Math.max(min, Math.min(max, x));
}

function stripZero(x) {
    return String(x).replace(/^0+/, "");
}

// ------------------------------
// Player Autocomplete
// ------------------------------

const autocompleteCache = {};

function setupPlayerAutocomplete({
    inputId,
    dropdownId,
    seasonId
}) {

    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    const seasonSelect = document.getElementById(seasonId);

    if (!input || !dropdown || !seasonSelect) return;


    // ------------------------------
    // Load Player List
    // ------------------------------
    async function getPlayers() {

        const season = seasonSelect.value;

        // Use cached season list
        if (autocompleteCache[season]) {
            return autocompleteCache[season];
        }

        try {

            const response = await fetch(
                `https://batter-analyzer-backend.onrender.com/api/players?season=${season}`
            );

            if (!response.ok) {
                throw new Error("Unable to load player list.");
            }

            const players = await response.json();

            autocompleteCache[season] = players;

            return players;

        } catch (error) {

            console.error("Autocomplete player load failed:", error);

            return [];
        }
    }


    // ------------------------------
    // Render Dropdown
    // ------------------------------
    async function renderAutocomplete() {

        const players = await getPlayers();

        const search = input.value
            .trim()
            .toLowerCase();

        const matches = players.filter(player => {

            const name = (player.Player || "").toLowerCase();
            const team = (player.Team || "").toLowerCase();

            return (
                !search ||
                name.includes(search) ||
                team.includes(search)
            );
        });

        dropdown.innerHTML = "";

        matches.forEach(player => {

            const row = document.createElement("div");

            row.className = "player-autocomplete-row";

            row.innerHTML = `
                <span class="autocomplete-player-name">
                    ${player.Player}
                </span>

                <span class="autocomplete-player-team">
                    ${player.Team || ""}
                </span>
            `;

            row.addEventListener("click", () => {

                input.value = player.Player;

                dropdown.hidden = true;
            });

            dropdown.appendChild(row);
        });

        dropdown.hidden = matches.length === 0;
    }


    // ------------------------------
    // Open on Focus
    // ------------------------------
    input.addEventListener("focus", () => {

        renderAutocomplete();
    });


    // ------------------------------
    // Filter While Typing
    // ------------------------------
    input.addEventListener("input", () => {

        renderAutocomplete();
    });


    // ------------------------------
    // Season Changed
    // ------------------------------
    seasonSelect.addEventListener("change", () => {

        dropdown.hidden = true;

        // No need to destroy cache.
        // New season automatically uses its own list.
    });


    // ------------------------------
    // Close When Clicking Elsewhere
    // ------------------------------
    document.addEventListener("click", event => {

        if (!event.target.closest(".autocomplete-wrap")) {
            dropdown.hidden = true;
        }
    });
}


// ------------------------------
// Player 1
// ------------------------------
setupPlayerAutocomplete({
    inputId: "playerName",
    dropdownId: "playerAutocomplete",
    seasonId: "seasonSelect"
});


// ------------------------------
// Player 2
// ------------------------------
setupPlayerAutocomplete({
    inputId: "playerName2",
    dropdownId: "playerAutocomplete2",
    seasonId: "seasonSelect2"
});


// -------------------------------
// Main: Load player + update UI (backend-only)
// -------------------------------
async function handleLoad() {

    try {
        const name = document.getElementById("playerName").value.trim();
        const season = parseInt(document.getElementById("seasonSelect").value);

        if (!name) {
            alert("Enter a player name.");
            return;
        }

        const data = await loadBatter(name, season);

        if (!data || data.error || (Array.isArray(data) && data.length === 0)) {
            alert("Batter not found.");
            return;
        }

        const p = Array.isArray(data) ? data[0] : data;

        console.log("Loaded batter data:", p);
        console.log("HR value:", p.HR);

        const baScore    = scoreBA(p.BA);
        const obpScore   = scoreOBP(p.OBP);
        const slgScore   = scoreSLG(p.SLG);
        const kpctScore  = scoreKpct(p.Kpct);
        const bbpctScore = scoreBBpct(p.BBpct);

        updateBA(safeFixed(p.BA, 3), baScore);
updateOBP(safeFixed(p.OBP, 3), obpScore);
updateSLG(safeFixed(p.SLG, 3), slgScore);
updateKpct(safeFixed(p.Kpct, 1), kpctScore);
updateBBpct(safeFixed(p.BBpct, 1), bbpctScore);


// -------------------------------
// Season Production
// -------------------------------
document.getElementById("productionAB").textContent = p.AB ?? "--";
document.getElementById("productionH").textContent = p.H ?? "--";
document.getElementById("productionR").textContent = p.R ?? "--";
document.getElementById("productionRBI").textContent = p.RBI ?? "--";
document.getElementById("productionHR").textContent = p.HR ?? "--";
document.getElementById("productionBB").textContent = p.BB ?? "--";
document.getElementById("productionK").textContent = p.SO ?? "--";

// -------------------------------
// Calculate Overall
// -------------------------------
const overall = computeWeightedOverall({
    baScore,
    obpScore,
    slgScore,
    kpctScore,
    bbpctScore
});

updateOverall(overall);
updateParkAdjusted(p);
updateTier(overall);
updateArchetype(p);
updateScoutingNote(p);
updateXP(p.XP);
updateIdentityBadge();

updateWhatToWatch({

    BA: { raw: p.BA, score: baScore },
    OBP: { raw: p.OBP, score: obpScore },
    SLG: { raw: p.SLG, score: slgScore },
    Kpct: { raw: p.Kpct, score: kpctScore },
    BBpct: { raw: p.BBpct, score: bbpctScore }

});

// -------------------------------
// What to Watch
// -------------------------------
function updateWhatToWatch(metrics) {

    const watchGrid = document.getElementById("watchGrid");

    if (!watchGrid) return;

    // -------------------------------
    // Free Trial Lock
    // -------------------------------

    if (!hasAllAccess()) {

        watchGrid.innerHTML = `
            <div class="watch-premium-lock">

                <div class="watch-premium-icon">
                    🔒
                </div>

                <div class="watch-premium-badge">
                    ALL ACCESS
                </div>

                <div class="watch-premium-text">
                    Unlock What to Watch Analysis
                </div>

            </div>
        `;

        return;
    }

    // --------------------------------
    // Metric definitions
    // --------------------------------
    const items = [

        {
            key: "BA",
            title: "Hit Tool",
            raw: metrics.BA.raw,
            score: metrics.BA.score,

            goodText:
                "Strong batting average reflects a reliable hit tool.",

            neutralText:
                "Batting average production is solid but not a defining strength.",

            badText:
                "Limited batting average production may reduce offensive consistency."
        },

        {
            key: "OBP",
            title: "On-Base Ability",
            raw: metrics.OBP.raw,
            score: metrics.OBP.score,

            goodText:
                "Strong on-base production creates consistent offensive opportunities.",

            neutralText:
                "On-base production is solid but not a defining strength.",

            badText:
                "Limited on-base production may reduce scoring opportunities."
        },

        {
            key: "SLG",
            title: "Power",
            raw: metrics.SLG.raw,
            score: metrics.SLG.score,

            goodText:
                "Impact power is a major offensive strength.",

            neutralText:
                "Power production is solid but not a defining strength.",

            badText:
                "Limited power may cap extra-base and home run production."
        },

        {
            key: "Kpct",
            title: "Contact Skills",
            raw: metrics.Kpct.raw,
            score: metrics.Kpct.score,

            goodText:
                "Low strikeout rate supports consistent contact and batting average.",

            neutralText:
                "Strikeout rate is manageable but remains worth monitoring.",

            badText:
                "Elevated strikeout rate creates volatility in the offensive profile."
        },

        {
            key: "BBpct",
            title: "Plate Discipline",
            raw: metrics.BBpct.raw,
            score: metrics.BBpct.score,

            goodText:
                "Strong walk rate supports OBP and plate control.",

            neutralText:
                "Walk rate is adequate but not a major source of offensive value.",

            badText:
                "Low walk rate may limit on-base production and plate control."
        }

    ];


// --------------------------------
// Classify each metric
// --------------------------------
items.forEach(item => {

    if (item.score >= 7) {

        item.type = "good";
        item.icon = "↑";
        item.text = item.goodText;

        // 0 → 1 strength scale
        item.importance = (item.score - 7) / 3;

    }
    else if (item.score >= 4) {

        item.type = "neutral";
        item.icon = "−";
        item.text = item.neutralText;

        // Neutral metrics are less important
        item.importance = 0;

    }
    else {

        item.type = "bad";
        item.icon = "↓";
        item.text = item.badText;

        // 0 → 1 weakness scale
        item.importance = (4 - item.score) / 4;

    }

});


    // --------------------------------
    // Find the three most meaningful
    // --------------------------------
    items.sort((a, b) => b.importance - a.importance);

    const selected = items.slice(0, 3);


// --------------------------------
// Build cards
// --------------------------------
watchGrid.innerHTML = selected.map(item => {

    let rawDisplay;

    if (
        item.key === "BA" ||
        item.key === "OBP" ||
        item.key === "SLG"
    ) {
        rawDisplay = Number(item.raw)
            .toFixed(3)
            .replace(/^0/, "");
    }
    else {
        rawDisplay =
            Number(item.raw).toFixed(1) + "%";
    }


    const statLabel = {
        BA: "BA",
        OBP: "OBP",
        SLG: "SLG",
        Kpct: "K%",
        BBpct: "BB%"
    }[item.key];


    // Translate existing classification
    // into user-facing card language
    const statusLabel = {
        good: "STRENGTH",
        neutral: "MONITOR",
        bad: "CONCERN"
    }[item.type] || "MONITOR";


    return `
        <div class="watch-card watch-${item.type}">

            <div class="watch-card-top">

                <div class="watch-icon">
                    ${item.icon}
                </div>

                <div class="watch-status">
                    ${statusLabel}
                </div>

            </div>


            <div class="watch-content">

                <div class="watch-title">
                    ${item.title}
                </div>

                <div class="watch-text">
                    ${item.text}
                </div>

            </div>


            <div class="watch-evidence">

                <div class="watch-stat">

                    <span class="watch-stat-label">
                        ${statLabel}
                    </span>

                    <strong class="watch-stat-value">
                        ${rawDisplay}
                    </strong>

                </div>


                <div class="watch-divider"></div>


                <div class="watch-stat">

                    <span class="watch-stat-label">
                        SCORE
                    </span>

                    <strong class="watch-score">
                        ${item.score.toFixed(1)}
                        <small>/ 10</small>
                    </strong>

                </div>

            </div>

        </div>
    `;

}).join("");

}


// -------------------------------
// Fantasy Identity
// -------------------------------
const identity = classifyPlayer(p.XP, overall);

// -------------------------------
// Fantasy State
// -------------------------------
const div = calculateDivergence(p.XP, overall);
const state = divergenceState(div.divergencePct);

updateStateBadge(state);

updateFantasyStateMarker(state);

// -------------------------------
// Fantasy Value
// -------------------------------
const fantasyValue = getFantasyValue(
    p.OverallDivergence,
    p.OverallDivergenceSD
);

updateValueBadge(
    p.OverallDivergence,
    p.OverallDivergenceSD
);

updateFantasyValueMarker(fantasyValue);

// -------------------------------
// Fantasy Summary
// -------------------------------
updateFantasySummary(
    identity,
    state,
    fantasyValue
);

// -------------------------------
// Percentile - Free Trial Lock
// -------------------------------

const percentileEl =
    document.getElementById("overallPercentile");

if (!hasAllAccess()) {

    percentileEl.innerHTML = `
        <div class="percentile-premium-wrap">

            <span class="percentile-premium-lock">
                🔒
            </span>

            <span class="percentile-premium-label">
                ALL ACCESS
            </span>

        </div>
    `;

} else {

    percentileEl.textContent =
        p.Overall_pct !== undefined
            ? toOrdinal(Math.round(p.Overall_pct))
            : "--";
}

} catch (err) {
    console.error("Error loading player:", err);
}
}


// -------------------------------
// Load Batter of the Day
// -------------------------------
function loadBatterOfDay(season) {
    fetch(`https://batter-analyzer-backend.onrender.com/api/batter-of-day?season=${season}`)
        .then(res => res.json())
        .then(player => {

            console.log("Batter of the Day JSON:", player);
            console.log({
    name: document.getElementById("bod-name"),
    team: document.getElementById("bod-team"),
    overall: document.getElementById("bod-overall"),
    xp: document.getElementById("bod-xp"),
    summary: document.getElementById("bod-summary")
});

            // Basic fields
            document.getElementById("bod-name").textContent = player.Player;
            document.getElementById("bod-team").textContent = player.Team;

            document.getElementById("bod-overall").textContent =
                Number(player.overall).toFixed(1);

            document.getElementById("bod-xp").textContent =
                Math.round(player.XP);

            // Batter summary line (AVG, HR, RBI, Games)
            const formattedBA = Number(player.BA).toFixed(3).replace(/^0/, "");
const summaryText = `is batting ${formattedBA} with ${player.HR} HR and ${player.RBI} RBI across ${player.G} games.`;



            document.getElementById("bod-summary").textContent = summaryText;
        })
        .catch(err => {
            console.error("Error loading Batter of the Day:", err);
        });
}

// -------------------------------
// Trend Handler (Season Comparison)
// -------------------------------
async function handleTrend() {

    try {

        const rawName =
            document.getElementById("playerName")
                .value
                .trim();

        if (!rawName) {
            alert("Enter a player name first.");
            return;
        }


        const season =
            Number(
                document.getElementById("seasonSelect").value
            );

        const lastSeason =
            season - 1;


        // ---------------------------------
        // Fetch both seasons
        // ---------------------------------

        const currArr = await fetch(
            `https://batter-analyzer-backend.onrender.com/api/batters?name=${encodeURIComponent(rawName)}&season=${season}`
        ).then(r => r.json());


        const prevArr = await fetch(
            `https://batter-analyzer-backend.onrender.com/api/batters?name=${encodeURIComponent(rawName)}&season=${lastSeason}`
        ).then(r => r.json());


        const curr =
            Array.isArray(currArr)
                ? currArr[0]
                : currArr;

        const prev =
            Array.isArray(prevArr)
                ? prevArr[0]
                : prevArr;


        if (
            !curr ||
            curr.error ||
            !prev ||
            prev.error
        ) {
            alert("Not enough data for season comparison.");
            return;
        }


        if (
            curr.BA == null ||
            prev.BA == null
        ) {
            alert("Not enough data for season comparison.");
            return;
        }


        // ---------------------------------
        // Helpers
        // ---------------------------------

        function setText(id, value) {

            const el =
                document.getElementById(id);

            if (!el) return;

            el.textContent =
                value ?? "--";
        }


        function setTrendMeter(
            scoreId,
            meterId,
            value
        ) {

            const scoreEl =
                document.getElementById(scoreId);

            const meterEl =
                document.getElementById(meterId);

            const score =
                Number(value);


            if (!Number.isFinite(score)) {

                if (scoreEl) {
                    scoreEl.textContent = "--";
                }

                if (meterEl) {
                    meterEl.style.width = "0%";
                }

                return;
            }


            if (scoreEl) {
                scoreEl.textContent =
                    score.toFixed(1);
            }


            if (meterEl) {

                const clamped =
                    Math.max(
                        0,
                        Math.min(10, score)
                    );

                meterEl.style.width =
                    `${clamped * 10}%`;
            }
        }


        function formatOverall(value) {

            const n = Number(value);

            return Number.isFinite(n)
                ? n.toFixed(1)
                : "--";
        }


        function formatXP(value) {

            const n = Number(value);

            return Number.isFinite(n)
                ? Math.round(n)
                : "--";
        }


        function formatPark(value) {

            const n = Number(value);

            return Number.isFinite(n)
                ? n.toFixed(1)
                : "--";
        }


        // ---------------------------------
        // Player Identity
        // ---------------------------------

        setText(
            "trendPlayerName",
            curr.Name || rawName
        );

        setText(
            "trendPlayerTeam",
            curr.Team || "--"
        );


        // ---------------------------------
        // Season Headers
        // ---------------------------------

        setText(
            "trendSeason1",
            lastSeason
        );

        setText(
            "trendSeason2",
            season
        );


        // ---------------------------------
        // Summary Metrics
        //
        // Prior season = 1
        // Current season = 2
        // ---------------------------------

        setText(
            "trendOverall1",
            formatOverall(prev.Overall)
        );

        setText(
            "trendOverall2",
            formatOverall(curr.Overall)
        );


        setText(
            "trendXP1",
            formatXP(prev.XP)
        );

        setText(
            "trendXP2",
            formatXP(curr.XP)
        );


        setText(
            "trendTier1",
            getBatterTier(
                Number(prev.Overall)
            )
        );

        setText(
            "trendTier2",
            getBatterTier(
                Number(curr.Overall)
            )
        );


        setText(
            "trendPark1",
            formatPark(
                prev.ParkAdjustedOverall
            )
        );

        setText(
            "trendPark2",
            formatPark(
                curr.ParkAdjustedOverall
            )
        );

        setText(
            "trendSLGRaw1",
            stripZero(Number(prev.SLG).toFixed(3))
        );

        setText(
            "trendSLGRaw2",
            stripZero(Number(curr.SLG).toFixed(3))
        );


        // ---------------------------------
        // Archetype
        // ---------------------------------

        setText(
            "trendArchetype1",
            prev.Archetype || "--"
        );

        setText(
            "trendArchetype2",
            curr.Archetype || "--"
        );


        setText(
            "trendMatch1",
            prev.ArchetypeMatch || "--"
        );

        setText(
            "trendMatch2",
            curr.ArchetypeMatch || "--"
        );


        // ---------------------------------
        // Profile Shape
        // ---------------------------------

        setTrendMeter(
            "trendBAScore1",
            "trendBAMeter1",
            prev.BA_score
        );

        setTrendMeter(
            "trendBAScore2",
            "trendBAMeter2",
            curr.BA_score
        );


        setTrendMeter(
            "trendOBPScore1",
            "trendOBPMeter1",
            prev.OBP_score
        );

        setTrendMeter(
            "trendOBPScore2",
            "trendOBPMeter2",
            curr.OBP_score
        );


        setTrendMeter(
            "trendSLGScore1",
            "trendSLGMeter1",
            prev.SLG_score
        );

        setTrendMeter(
            "trendSLGScore2",
            "trendSLGMeter2",
            curr.SLG_score
        );


        setTrendMeter(
            "trendKScore1",
            "trendKMeter1",
            prev.Kpct_score
        );

        setTrendMeter(
            "trendKScore2",
            "trendKMeter2",
            curr.Kpct_score
        );


        setTrendMeter(
            "trendBBScore1",
            "trendBBMeter1",
            prev.BBpct_score
        );

        setTrendMeter(
            "trendBBScore2",
            "trendBBMeter2",
            curr.BBpct_score
        );


        // ---------------------------------
        // Trend Analysis
        // ---------------------------------

        const trendAnalysis =
            generateBatterTrendAnalysis(
                curr,
                prev
            );

        setText(
            "trendAnalysisText",
            trendAnalysis
        );


        // ---------------------------------
        // Modal Title
        // ---------------------------------

        document.getElementById(
            "trendTitle"
        ).textContent =
            `Batter Trend (${lastSeason} → ${season})`;


        // ---------------------------------
        // Open Modal
        // ---------------------------------

        document.getElementById(
            "trendModal"
        ).style.display = "flex";


    }
    catch (err) {

        console.error(
            "Trend error:",
            err
        );
    }
}

// -------------------------------
// Batter Trend Analysis
// Raw Direction + Normalized Magnitude
// -------------------------------
function generateBatterTrendAnalysis(curr, prev) {

    // ---------------------------------
    // 1. Raw metric direction
    //
    // IMPORTANT:
    // Raw stats determine whether a
    // skill actually improved/declined.
    // ---------------------------------
    const rawDirections = {

        BA:
            Number(curr.BA) > Number(prev.BA) ? 1 :
            Number(curr.BA) < Number(prev.BA) ? -1 : 0,

        OBP:
            Number(curr.OBP) > Number(prev.OBP) ? 1 :
            Number(curr.OBP) < Number(prev.OBP) ? -1 : 0,

        SLG:
            Number(curr.SLG) > Number(prev.SLG) ? 1 :
            Number(curr.SLG) < Number(prev.SLG) ? -1 : 0,

        // Lower K% is better
        Kpct:
            Number(curr.Kpct) < Number(prev.Kpct) ? 1 :
            Number(curr.Kpct) > Number(prev.Kpct) ? -1 : 0,

        // Higher BB% is better
        BBpct:
            Number(curr.BBpct) > Number(prev.BBpct) ? 1 :
            Number(curr.BBpct) < Number(prev.BBpct) ? -1 : 0
    };


    // ---------------------------------
    // 2. Normalized metric-score movement
    //
    // Score changes determine magnitude,
    // NOT direction.
    // ---------------------------------
    const scoreChanges = {

        BA:
            scoreBA(curr.BA) -
            scoreBA(prev.BA),

        OBP:
            scoreOBP(curr.OBP) -
            scoreOBP(prev.OBP),

        SLG:
            scoreSLG(curr.SLG) -
            scoreSLG(prev.SLG),

        Kpct:
            scoreKpct(curr.Kpct) -
            scoreKpct(prev.Kpct),

        BBpct:
            scoreBBpct(curr.BBpct) -
            scoreBBpct(prev.BBpct)
    };


    // ---------------------------------
    // 3. Overall magnitude
    //
    // Mean absolute movement across
    // five normalized metric scores.
    // ---------------------------------
    const magnitude =
        Object.values(scoreChanges)
            .reduce(
                (sum, value) =>
                    sum + Math.abs(value),
                0
            ) / 5;


    // ---------------------------------
    // 4. Net Overall direction
    // ---------------------------------
    const overallDiff =
    Number(curr.Overall) -
    Number(prev.Overall);

    let direction;

    if (overallDiff > 0.05) {
        direction = "improvement";
    }
    else if (overallDiff < -0.05) {
        direction = "decline";
    }
    else {
        direction = "stable";
    }


    // ---------------------------------
    // 5. Magnitude helper
    //
    // Initial calibration thresholds
    // ---------------------------------
    function movementLevel(change) {

        const amount =
            Math.abs(change);

        if (amount < 0.75) {
            return "limited";
        }
        else if (amount < 1.50) {
            return "moderate";
        }
        else {
            return "significant";
        }
    }


    const magnitudeLabel =
        movementLevel(magnitude);


    // ---------------------------------
    // 6. Skill Direction / Breadth
    //
    // Uses RAW metric direction.
    // This prevents score clamps from
    // hiding real statistical movement.
    // ---------------------------------
    const skillDirections =
        Object.values(rawDirections);

    const skillImproved =
        skillDirections
            .filter(value => value > 0)
            .length;

    const skillDeclined =
        skillDirections
            .filter(value => value < 0)
            .length;

    const skillFlat =
        skillDirections
            .filter(value => value === 0)
            .length;


    // At least two underlying skills
    // moved in each direction.
    const mixedProfile =
        skillImproved >= 2 &&
        skillDeclined >= 2;


    // ---------------------------------
    // 7. Breadth
    // ---------------------------------
    let breadthLabel;

    if (
        skillImproved >= 4 ||
        skillDeclined >= 4
    ) {
        breadthLabel = "broad";
    }
    else if (
        skillImproved >= 3 ||
        skillDeclined >= 3
    ) {
        breadthLabel = "general";
    }
    else {
        breadthLabel = "mixed";
    }


    // ---------------------------------
    // 8. Headline
    //
    // Breadth = raw metric direction
    // Magnitude = normalized movement
    // Net result = Overall Score
    // ---------------------------------
    let classification;


    // Mixed underlying skill profile
    // takes priority.
    if (mixedProfile) {

        if (magnitudeLabel === "significant") {
            classification =
                "Mixed year-over-year performance with significant underlying movement.";
        }
        else if (magnitudeLabel === "moderate") {
            classification =
                "Mixed year-over-year performance with moderate underlying movement.";
        }
        else {
            classification =
                "Mixed year-over-year performance with limited overall movement.";
        }
    }


    // Stable net profile
    else if (direction === "stable") {

        if (magnitudeLabel === "significant") {
            classification =
                "Year-over-year performance was relatively stable despite significant underlying movement.";
        }
        else if (magnitudeLabel === "moderate") {
            classification =
                "Year-over-year performance was relatively stable with moderate underlying movement.";
        }
        else {
            classification =
                "Year-over-year performance was relatively stable.";
        }
    }


    // Improvement
    else if (direction === "improvement") {

        if (magnitudeLabel === "significant") {
            classification =
                `${capitalize(breadthLabel)} and significant year-over-year improvement.`;
        }
        else if (magnitudeLabel === "moderate") {
            classification =
                `${capitalize(breadthLabel)} but moderate year-over-year improvement.`;
        }
        else {
            classification =
                `${capitalize(breadthLabel)} but limited year-over-year improvement.`;
        }
    }


    // Decline
    else {

        if (magnitudeLabel === "significant") {
            classification =
                `${capitalize(breadthLabel)} and significant year-over-year decline.`;
        }
        else if (magnitudeLabel === "moderate") {
            classification =
                `${capitalize(breadthLabel)} but moderate year-over-year decline.`;
        }
        else {
            classification =
                `${capitalize(breadthLabel)} but limited year-over-year decline.`;
        }
    }


    const sentences =
        [classification];


    // ---------------------------------
    // 9. Hitting + On-Base Profile
    // BA + OBP
    //
    // Raw direction
    // Normalized magnitude
    // ---------------------------------
    const baDirection =
        rawDirections.BA;

    const obpDirection =
        rawDirections.OBP;

    const hittingMagnitude =
        (
            Math.abs(scoreChanges.BA) +
            Math.abs(scoreChanges.OBP)
        ) / 2;

    const hittingLevel =
        movementLevel(hittingMagnitude);


    if (
        baDirection > 0 &&
        obpDirection > 0
    ) {

        if (hittingLevel === "significant") {
            sentences.push(
                "The hitting and on-base profile improved substantially, with major gains in BA and OBP."
            );
        }
        else if (hittingLevel === "moderate") {
            sentences.push(
                "The hitting and on-base profile improved moderately, with gains in BA and OBP."
            );
        }
        else {
            sentences.push(
                "The hitting and on-base profile improved slightly, with modest gains in BA and OBP."
            );
        }
    }

    else if (
        baDirection < 0 &&
        obpDirection < 0
    ) {

        if (hittingLevel === "significant") {
            sentences.push(
                "The hitting and on-base profile declined substantially, with major deterioration in BA and OBP."
            );
        }
        else if (hittingLevel === "moderate") {
            sentences.push(
                "The hitting and on-base profile declined moderately, with decreases in BA and OBP."
            );
        }
        else {
            sentences.push(
                "The hitting and on-base profile declined slightly, with modest decreases in BA and OBP."
            );
        }
    }

    else if (
        baDirection > 0 &&
        obpDirection < 0
    ) {

        sentences.push(
            "The hitting and on-base profile was mixed, with BA improving while OBP declined."
        );
    }

    else if (
        baDirection < 0 &&
        obpDirection > 0
    ) {

        sentences.push(
            "The hitting and on-base profile was mixed, with OBP improving while BA declined."
        );
    }

    // One raw metric moved while the
    // other remained unchanged.
    else if (baDirection > 0) {
        sentences.push(
            "The hitting and on-base profile improved, driven by a higher BA while OBP remained stable."
        );
    }

    else if (baDirection < 0) {
        sentences.push(
            "The hitting and on-base profile declined, driven by a lower BA while OBP remained stable."
        );
    }

    else if (obpDirection > 0) {
        sentences.push(
            "The hitting and on-base profile improved, driven by a higher OBP while BA remained stable."
        );
    }

    else if (obpDirection < 0) {
        sentences.push(
            "The hitting and on-base profile declined, driven by a lower OBP while BA remained stable."
        );
    }


    // ---------------------------------
    // 10. Power
    // SLG
    //
    // Raw direction
    // Normalized magnitude
    // ---------------------------------
    const slgDirection =
        rawDirections.SLG;

    const powerLevel =
        movementLevel(
            scoreChanges.SLG
        );


    if (slgDirection > 0) {

        if (powerLevel === "significant") {
            sentences.push(
                "Power production improved substantially."
            );
        }
        else if (powerLevel === "moderate") {
            sentences.push(
                "Power production improved moderately."
            );
        }
        else {
            sentences.push(
                "Power production improved slightly."
            );
        }
    }

    else if (slgDirection < 0) {

        if (powerLevel === "significant") {
            sentences.push(
                "Power production declined substantially."
            );
        }
        else if (powerLevel === "moderate") {
            sentences.push(
                "Power production declined moderately."
            );
        }
        else {
            sentences.push(
                "Power production declined slightly."
            );
        }
    }


    // ---------------------------------
    // 11. Plate Discipline
    // K% + BB%
    //
    // Raw direction determines what
    // happened.
    //
    // Normalized score movement
    // determines how large it was.
    // ---------------------------------
    const kDirection =
        rawDirections.Kpct;

    const bbDirection =
        rawDirections.BBpct;

    const disciplineMagnitude =
        (
            Math.abs(scoreChanges.Kpct) +
            Math.abs(scoreChanges.BBpct)
        ) / 2;

    const disciplineLevel =
        movementLevel(
            disciplineMagnitude
        );


    // Both improved
    if (
        kDirection > 0 &&
        bbDirection > 0
    ) {

        if (disciplineLevel === "significant") {
            sentences.push(
                "Plate discipline improved substantially, with major gains in strikeout and walk performance."
            );
        }
        else if (disciplineLevel === "moderate") {
            sentences.push(
                "Plate discipline improved moderately, with a lower K% and higher BB%."
            );
        }
        else {
            sentences.push(
                "Plate discipline improved slightly, with modest gains in K% and BB%."
            );
        }
    }


    // Both declined
    else if (
        kDirection < 0 &&
        bbDirection < 0
    ) {

        if (disciplineLevel === "significant") {
            sentences.push(
                "Plate discipline declined substantially, with meaningful deterioration in both strikeout and walk performance."
            );
        }
        else if (disciplineLevel === "moderate") {
            sentences.push(
                "Plate discipline declined moderately, with a higher K% and lower BB%."
            );
        }
        else {
            sentences.push(
                "Plate discipline declined slightly, with a higher K% and lower BB%."
            );
        }
    }


    // K% declined, BB% improved
    else if (
        kDirection < 0 &&
        bbDirection > 0
    ) {

        sentences.push(
            "Plate discipline was mixed, with stronger walk production offset by a higher strikeout rate."
        );
    }


    // K% improved, BB% declined
    else if (
        kDirection > 0 &&
        bbDirection < 0
    ) {

        sentences.push(
            "Plate discipline was mixed, with fewer strikeouts but a lower walk rate."
        );
    }


    // K% changed, BB% raw value flat
    else if (
        kDirection > 0 &&
        bbDirection === 0
    ) {

        sentences.push(
            "Plate discipline improved, driven by a lower K% while BB% remained stable."
        );
    }

    else if (
        kDirection < 0 &&
        bbDirection === 0
    ) {

        sentences.push(
            "Plate discipline declined, driven by a higher K% while BB% remained stable."
        );
    }


    // BB% changed, K% raw value flat
    else if (
        bbDirection > 0 &&
        kDirection === 0
    ) {

        sentences.push(
            "Plate discipline improved, driven by a higher BB% while K% remained stable."
        );
    }

    else if (
        bbDirection < 0 &&
        kDirection === 0
    ) {

        sentences.push(
            "Plate discipline declined, driven by a lower BB% while K% remained stable."
        );
    }


    // ---------------------------------
    // 12. XP + Overall
    // ---------------------------------
    const xpDiff =
        Math.round(curr.XP) -
        Math.round(prev.XP);


    if (
        xpDiff > 0 &&
        overallDiff > 0
    ) {

        sentences.push(
            `XP increased by ${Math.abs(xpDiff)}, while Overall Score improved by ${Math.abs(overallDiff).toFixed(1)} points.`
        );
    }

    else if (
        xpDiff < 0 &&
        overallDiff < 0
    ) {

        sentences.push(
            `XP declined by ${Math.abs(xpDiff)}, while Overall Score decreased by ${Math.abs(overallDiff).toFixed(1)} points.`
        );
    }

    else if (
        xpDiff > 0 &&
        overallDiff < 0
    ) {

        sentences.push(
            `XP increased by ${Math.abs(xpDiff)}, while Overall Score declined by ${Math.abs(overallDiff).toFixed(1)} points.`
        );
    }

    else if (
        xpDiff < 0 &&
        overallDiff > 0
    ) {

        sentences.push(
            `XP declined by ${Math.abs(xpDiff)}, while Overall Score improved by ${Math.abs(overallDiff).toFixed(1)} points.`
        );
    }

    else if (
        xpDiff === 0 &&
        overallDiff > 0
    ) {

        sentences.push(
            `XP remained unchanged, while Overall Score improved by ${Math.abs(overallDiff).toFixed(1)} points.`
        );
    }

    else if (
        xpDiff === 0 &&
        overallDiff < 0
    ) {

        sentences.push(
            `XP remained unchanged, while Overall Score declined by ${Math.abs(overallDiff).toFixed(1)} points.`
        );
    }

    else if (
        xpDiff > 0 &&
        Math.abs(overallDiff) <= 0.05
    ) {

        sentences.push(
            `XP increased by ${Math.abs(xpDiff)}, while Overall Score remained essentially unchanged.`
        );
    }

    else if (
        xpDiff < 0 &&
        Math.abs(overallDiff) <= 0.05
    ) {

        sentences.push(
            `XP declined by ${Math.abs(xpDiff)}, while Overall Score remained essentially unchanged.`
        );
    }


    return sentences.join(" ");
}


// -------------------------------
// Capitalize helper
// -------------------------------
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// -------------------------------
// Batter Comparison Summary
// -------------------------------
function generateBatterComparisonSummary(
    p1,
    p2,
    data1,
    data2,
    xp1,
    xp2,
    overall1,
    overall2
) {

    const sentences = [];

    // ---------------------------
    // TiM Profile Scores
    // ---------------------------

    const profile1 = {
        BA: Number(data1.BA_score),
        OBP: Number(data1.OBP_score),
        SLG: Number(data1.SLG_score),
        K: Number(data1.Kpct_score),
        BB: Number(data1.BBpct_score)
    };

    const profile2 = {
        BA: Number(data2.BA_score),
        OBP: Number(data2.OBP_score),
        SLG: Number(data2.SLG_score),
        K: Number(data2.Kpct_score),
        BB: Number(data2.BBpct_score)
    };


    // ---------------------------
    // Archetype Relationship
    // ---------------------------

    const archetype1 = data1.Archetype;
    const archetype2 = data2.Archetype;

    if (
        archetype1 &&
        archetype2 &&
        archetype1 === archetype2
    ) {

        sentences.push(
            `${p1} and ${p2} share the ${archetype1} archetype, although their individual profile shapes differ.`
        );

    }
    else if (archetype1 && archetype2) {

        sentences.push(
            `${p1} profiles closest to ${archetype1}, while ${p2} profiles closest to ${archetype2}.`
        );

    }


    // ---------------------------
    // Find Meaningful Profile
    // Advantages
    // ---------------------------

    const metrics = [
        {
            key: "BA",
            label: "BA"
        },
        {
            key: "OBP",
            label: "OBP"
        },
        {
            key: "SLG",
            label: "SLG"
        },
        {
            key: "K",
            label: "K%"
        },
        {
            key: "BB",
            label: "BB%"
        }
    ];


    const p1Advantages = [];
    const p2Advantages = [];

    /*
       A 0.5-point difference on the
       normalized 0–10 scale is enough
       to call out visually.

       Smaller differences are treated
       as broadly similar.
    */

    const PROFILE_THRESHOLD = 0.5;


    metrics.forEach(metric => {

        const value1 =
            profile1[metric.key];

        const value2 =
            profile2[metric.key];

        if (
            !Number.isFinite(value1) ||
            !Number.isFinite(value2)
        ) {
            return;
        }

        const difference =
            value1 - value2;


        if (difference >= PROFILE_THRESHOLD) {

            p1Advantages.push(
                metric.label
            );

        }
        else if (
            difference <= -PROFILE_THRESHOLD
        ) {

            p2Advantages.push(
                metric.label
            );

        }

    });


    // ---------------------------
    // Profile Shape Summary
    // ---------------------------

    function formatMetricList(list) {

        if (list.length === 0) {
            return "";
        }

        if (list.length === 1) {
            return list[0];
        }

        if (list.length === 2) {
            return `${list[0]} and ${list[1]}`;
        }

        return (
            list.slice(0, -1).join(", ") +
            `, and ${list[list.length - 1]}`
        );
    }


    if (
        p1Advantages.length > 0 &&
        p2Advantages.length > 0
    ) {

        sentences.push(
            `${p1} shows the stronger normalized profile in ${formatMetricList(p1Advantages)}, while ${p2} is stronger in ${formatMetricList(p2Advantages)}.`
        );

    }
    else if (p1Advantages.length > 0) {

        sentences.push(
            `${p1} shows the stronger normalized profile in ${formatMetricList(p1Advantages)}, with the remaining dimensions relatively close.`
        );

    }
    else if (p2Advantages.length > 0) {

        sentences.push(
            `${p2} shows the stronger normalized profile in ${formatMetricList(p2Advantages)}, with the remaining dimensions relatively close.`
        );

    }
    else {

        sentences.push(
            `The two hitters show very similar normalized profiles across the five TiM batting dimensions.`
        );

    }


    // ---------------------------
    // Overall + XP Context
    // ---------------------------

    const overallDifference =
        overall1 - overall2;

    const xpDifference =
        xp1 - xp2;


    /*
       Keep tiny differences from
       generating unnecessary winner
       language.
    */

    const OVERALL_THRESHOLD = 0.2;
    const XP_THRESHOLD = 20;


    const meaningfulOverall =
        Math.abs(overallDifference) >=
        OVERALL_THRESHOLD;

    const meaningfulXP =
        Math.abs(xpDifference) >=
        XP_THRESHOLD;


    if (
        meaningfulOverall &&
        meaningfulXP
    ) {

        const overallLeader =
            overallDifference > 0
                ? p1
                : p2;

        const xpLeader =
            xpDifference > 0
                ? p1
                : p2;


        if (overallLeader === xpLeader) {

            sentences.push(
                `${overallLeader} also holds the advantage in both Overall Score and XP.`
            );

        }
        else {

            sentences.push(
                `${overallLeader} holds the stronger Overall Score, while ${xpLeader} holds the advantage in XP.`
            );

        }

    }
    else if (meaningfulOverall) {

        const leader =
            overallDifference > 0
                ? p1
                : p2;

        sentences.push(
            `${leader} holds the stronger Overall Score, while XP is relatively close.`
        );

    }
    else if (meaningfulXP) {

        const leader =
            xpDifference > 0
                ? p1
                : p2;

        sentences.push(
            `${leader} holds the advantage in XP, while Overall Score is relatively close.`
        );

    }
    else {

        sentences.push(
            `Overall Score and XP are also relatively close between the two hitters.`
        );

    }


    return sentences.join(" ");
}

// -------------------------------
// Compare Button (Batting Version)
// -------------------------------
async function showCompareModal() {

    console.log("COMPARE BUTTON CLICKED");

    function formatName(name) {
        return name
            .split(" ")
            .map(word =>
                word
                    .split("-")
                    .map(part =>
                        part.charAt(0).toUpperCase() +
                        part.slice(1).toLowerCase()
                    )
                    .join("-")
            )
            .join(" ");
    }


    // ----------------------------------
    // Small display helpers
    // ----------------------------------

    function setText(id, value) {
        const el = document.getElementById(id);

        if (!el) return;

        el.textContent =
            value !== null &&
            value !== undefined &&
            value !== ""
                ? value
                : "--";
    }


    function setProfileMeter(id, score) {
        const el = document.getElementById(id);

        if (!el) return;

        const value = Number(score);

        if (!Number.isFinite(value)) {
            el.style.width = "0%";
            return;
        }

        const clamped =
            Math.max(0, Math.min(10, value));

        el.style.width = `${clamped * 10}%`;
    }


    function formatScore(score) {
        const value = Number(score);

        return Number.isFinite(value)
            ? value.toFixed(1)
            : "--";
    }


    function formatOverall(value) {
        const number = Number(value);

        return Number.isFinite(number)
            ? number.toFixed(1)
            : "--";
    }


    function formatXP(value) {
        const number = Number(value);

        return Number.isFinite(number)
            ? Math.round(number)
            : "--";
    }


    // ----------------------------------
    // Inputs
    // ----------------------------------

    try {

        const p1_raw =
            document.getElementById("playerName")
                .value
                .trim();

        const s1 =
            document.getElementById("seasonSelect")
                .value;


        const p2_raw =
            document.getElementById("playerName2")
                .value
                .trim();

        const s2 =
            document.getElementById("seasonSelect2")
                .value;


        if (!p1_raw || !p2_raw) {
            alert("Enter both batter names.");
            return;
        }


        // ----------------------------------
        // Load Players
        // ----------------------------------

        const data1Arr =
            await loadBatter(p1_raw, s1, true);

        const data2Arr =
            await loadBatter(p2_raw, s2, true);


        const data1 =
            Array.isArray(data1Arr)
                ? data1Arr[0]
                : data1Arr;

        const data2 =
            Array.isArray(data2Arr)
                ? data2Arr[0]
                : data2Arr;


        if (
            !data1 ||
            data1.error ||
            !data2 ||
            data2.error
        ) {
            alert("One or both batters not found.");
            return;
        }


        if (
            data1.BA == null ||
            data2.BA == null
        ) {
            alert("Not enough data for comparison.");
            return;
        }


        // ----------------------------------
        // Player Names
        // ----------------------------------

        const p1_display =
            formatName(data1.Name || p1_raw);

        const p2_display =
            formatName(data2.Name || p2_raw);


        setText(
            "compareName1",
            `${p1_display} (${s1})`
        );

        setText(
            "compareName2",
            `${p2_display} (${s2})`
        );


        // ----------------------------------
        // Team
        // ----------------------------------

        setText(
            "compareTeam1",
            data1.Team || "--"
        );

        setText(
            "compareTeam2",
            data2.Team || "--"
        );


        // ----------------------------------
        // Use TiM Engine Outputs
        // ----------------------------------

        const overall1 =
            Number(data1.Overall);

        const overall2 =
            Number(data2.Overall);


        const xp1 =
            Number(data1.XP);

        const xp2 =
            Number(data2.XP);


        // ----------------------------------
        // Summary Metrics
        // ----------------------------------

        setText(
            "compareOverall1",
            formatOverall(overall1)
        );

        setText(
            "compareOverall2",
            formatOverall(overall2)
        );


        setText(
            "compareXP1",
            formatXP(xp1)
        );

        setText(
            "compareXP2",
            formatXP(xp2)
        );


        /*
           Tier:

           For now this uses your existing
           Overall values.

           We'll wire this to your exact
           Tier helper once we look at it.
        */

        setText(
            "compareTier1",
            getBatterTier(overall1)
        );

        setText(
            "compareTier2",
            getBatterTier(overall2)
        );


        // ----------------------------------
        // Park Adjusted
        // ----------------------------------

        setText(
            "comparePark1",
            formatOverall(
                data1.ParkAdjustedOverall
            )
        );

        setText(
            "comparePark2",
            formatOverall(
                data2.ParkAdjustedOverall
            )
        );


        // ----------------------------------
        // Archetype
        // ----------------------------------

        setText(
            "compareArchetype1",
            data1.Archetype
        );

        setText(
            "compareArchetype2",
            data2.Archetype
        );


        setText(
            "compareMatch1",
            data1.ArchetypeMatch
        );

        setText(
            "compareMatch2",
            data2.ArchetypeMatch
        );


        // ----------------------------------
        // Profile Scores
        // ----------------------------------

        const profile1 = {
            BA: data1.BA_score,
            OBP: data1.OBP_score,
            SLG: data1.SLG_score,
            K: data1.Kpct_score,
            BB: data1.BBpct_score
        };


        const profile2 = {
            BA: data2.BA_score,
            OBP: data2.OBP_score,
            SLG: data2.SLG_score,
            K: data2.Kpct_score,
            BB: data2.BBpct_score
        };


        // ----------------------------------
        // Profile Numbers
        // ----------------------------------

        setText(
            "compareBAScore1",
            formatScore(profile1.BA)
        );

        setText(
            "compareBAScore2",
            formatScore(profile2.BA)
        );


        setText(
            "compareOBPScore1",
            formatScore(profile1.OBP)
        );

        setText(
            "compareOBPScore2",
            formatScore(profile2.OBP)
        );


        setText(
            "compareSLGScore1",
            formatScore(profile1.SLG)
        );

        setText(
            "compareSLGScore2",
            formatScore(profile2.SLG)
        );


        setText(
            "compareKScore1",
            formatScore(profile1.K)
        );

        setText(
            "compareKScore2",
            formatScore(profile2.K)
        );


        setText(
            "compareBBScore1",
            formatScore(profile1.BB)
        );

        setText(
            "compareBBScore2",
            formatScore(profile2.BB)
        );


        // ----------------------------------
        // Profile Meters
        // ----------------------------------

        setProfileMeter(
            "compareBAMeter1",
            profile1.BA
        );

        setProfileMeter(
            "compareBAMeter2",
            profile2.BA
        );


        setProfileMeter(
            "compareOBPMeter1",
            profile1.OBP
        );

        setProfileMeter(
            "compareOBPMeter2",
            profile2.OBP
        );


        setProfileMeter(
            "compareSLGMeter1",
            profile1.SLG
        );

        setProfileMeter(
            "compareSLGMeter2",
            profile2.SLG
        );


        setProfileMeter(
            "compareKMeter1",
            profile1.K
        );

        setProfileMeter(
            "compareKMeter2",
            profile2.K
        );


        setProfileMeter(
            "compareBBMeter1",
            profile1.BB
        );

        setProfileMeter(
            "compareBBMeter2",
            profile2.BB
        );


        // ----------------------------------
        // Comparison Summary
        // ----------------------------------

        const comparisonSummary =
            generateBatterComparisonSummary(
                p1_display,
                p2_display,
                data1,
                data2,
                xp1,
                xp2,
                overall1,
                overall2
            );


        setText(
            "comparisonSummaryText",
            comparisonSummary
        );


        // ----------------------------------
        // Open Modal
        // ----------------------------------

        document.getElementById(
            "compareModal"
        ).style.display = "flex";


    } catch (err) {

        console.error(
            "Compare error:",
            err
        );

    }
}


// -------------------------------
// Leaders Button
// -------------------------------
async function loadLeaders() {

    try {
        const season = document.getElementById("seasonSelect").value;

        const data = await fetch(
            `https://batter-analyzer-backend.onrender.com/api/leaders?season=${season}`
        ).then(r => r.json());

        if (!Array.isArray(data)) {
            alert("No leaderboard data available.");
            return;
        }

        buildLeadersTable(data);

    } catch (err) {
        console.error("Leaders error:", err);
        alert("Error loading leaderboard.");
    }
}


// -------------------------------
// Leaders Table Name Normalization
// -------------------------------
function normalizeName(raw) {
    if (!raw) return raw;

    // Convert raw UTF-8 byte sequences like <c3><ad> into real characters
    let cleaned = raw.replace(/<c3><ad>/g, "í")
                     .replace(/<c3><a1>/g, "á")
                     .replace(/<c3><b1>/g, "ñ")
                     .replace(/<c3><a9>/g, "é")
                     .replace(/<c3><b3>/g, "ó")
                     .replace(/<c3><ba>/g, "ú");

    // Strip accents
    cleaned = cleaned.normalize("NFD").replace(/\p{Diacritic}/gu, "");

    return cleaned;
}

// -------------------------------
// Leaders Table (BATTERS, MATCHED TO PITCHERS)
// -------------------------------

function buildLeadersTable(arr) {
    const tbody = document.getElementById("leadersBody");
    tbody.innerHTML = "";

    const filtered = arr;

    // Sort by OVERALL score (backend computed)
    const sorted = [...filtered].sort((a, b) => b.overall - a.overall);

    // Top 50
    const top50 = sorted.slice(0, 50);

    // Build table
    top50.forEach((p, index) => {
        const originalPlayer = p.Player;

        const displayPlayer = normalizeName(p.Player);
        p.Name = normalizeName(p.Name);

        const rank = index + 1;

        const identity = p.identity || "Neutral";
        const identityClass = identity.toLowerCase();

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${rank}</td>
            <td>
                <button
                    type="button"
                    class="leader-player-link"
                >
                    ${displayPlayer}
                </button>
            </td>
            <td>${p.Team}</td>
            <td>${Math.round(p.XP)}</td>
            <td>${p.overall.toFixed(2)}</td>
            <td>
                <span class="leader-identity ${identityClass}">
                    ${identity}
                </span>
            </td>
        `;

        // Click player name → load into Batter Analyzer
        const playerButton = row.querySelector(".leader-player-link");

        playerButton.addEventListener("click", async () => {
            document.getElementById("playerName").value = displayPlayer;

            document.getElementById("leadersModal").style.display = "none";

            await handleLoad();
        });

        tbody.appendChild(row);
    });

    document.getElementById("leadersModal").style.display = "flex";
}

// -------------------------------
// Light Up Fantasy Badge
// -------------------------------

// XP-only backbone
function xpTier(xp) {
    if (xp >= 1200) return "breakout";
    if (xp >= 1100) return "overperformer";
    if (xp >= 1000) return "sleeper";
    if (xp >= 900)  return "consistent";
    return "neutral";
}

// Skill modifier (bumps tier up/down)
function applySkillModifier(tier, skill) {
    const order = ["neutral", "consistent", "sleeper", "overperformer", "breakout"];
    let index = order.indexOf(tier);

    if (skill >= 8.0) index++;     // bump up
    if (skill <= 6.0) index--;     // bump down

    // clamp to valid range
    index = Math.max(0, Math.min(order.length - 1, index));

    return order[index];
}

// Final badge classifier
function classifyPlayer(xp, skill) {
    const base = xpTier(xp);
    return applySkillModifier(base, skill);
}

// -------------------------------
// Calculate Divergence (Fantasy State)
// -------------------------------
function calculateDivergence(xp, overall) {
    const expectedXP = 813.86 + (47.78 * overall);
    const divergence = (xp - expectedXP) / expectedXP;

    return {
        expectedXP,
        divergence,
        divergencePct: divergence * 100
    };
}

// -------------------------------
// Divergence → Fantasy State
// -------------------------------
function divergenceState(divergencePct) {
    if (divergencePct > 5) return "strong";
    if (divergencePct >= -2.5) return "stable";
    if (divergencePct >= -5) return "vulnerable";
    return "high-risk";
}

function updateFantasyStateMarker(state) {

    const marker = document.getElementById("stateMarker");
    if (!marker) return;

    const positions = {
        "strong": 12.5,
        "stable": 37.5,
        "vulnerable": 62.5,
        "high-risk": 87.5
    };

    const position = positions[state];

    if (position == null) {
        marker.style.top = "37.5%";
        marker.style.opacity = "1";
        return;
    }

    marker.style.top = `${position}%`;
    marker.style.opacity = "1";
}

// -------------------------------
// Divergence → Fantasy Value
// -------------------------------
function getFantasyValue(overallDivergence, divergenceSD) {
    if (
        overallDivergence == null ||
        divergenceSD == null ||
        divergenceSD === 0
    ) {
        return "expected";
    }

    const z = overallDivergence / divergenceSD;

    if (z >= 1.0) return "extreme";
    if (z >= 0.5) return "elevated";
    if (z <= -1.0) return "suppressed";
    if (z <= -0.5) return "below";

    return "expected";
}

function updateFantasyValueMarker(value) {

    const marker = document.getElementById("valueMarker");
    if (!marker) return;

    const positions = {
        "extreme": 10,
        "elevated": 30,
        "expected": 50,
        "below": 70,
        "suppressed": 90
    };

    const position = positions[value];

    if (position == null) {
        marker.style.top = "50%";
        marker.style.opacity = "1";
        return;
    }

    marker.style.top = `${position}%`;
    marker.style.opacity = "1";
}

// -------------------------------
// Update Fantasy State Badge
// -------------------------------
function updateStateBadge(state) {
    const container = document.getElementById("player-state-key");

    if (!container) return;

    container.querySelectorAll(".state-badge").forEach(badge => {
        badge.classList.remove("active");
    });

    const badge = container.querySelector(`.state-badge.${state}`);

    if (badge) {
        badge.classList.add("active");
    }
}


// -------------------------------
// Update Fantasy Value Badge
// -------------------------------
function updateValueBadge(overallDivergence, divergenceSD) {
    const container = document.getElementById("player-value-key");
    if (!container) return;

    container.querySelectorAll(".value-badge").forEach(badge => {
        badge.classList.remove("active");
    });

    const valueClass = getFantasyValue(overallDivergence, divergenceSD);

    const badge = container.querySelector(`.value-badge.${valueClass}`);

    if (badge) {
        badge.classList.add("active");
    }
}


// -------------------------------
// Clear Fantasy State Badges
// -------------------------------
function clearStateBadges() {
    const container = document.getElementById("player-state-key");

    if (!container) return;

    container.querySelectorAll(".state-badge").forEach(badge => {
        badge.classList.remove("active");
    });
}


// -------------------------------
// Clear Fantasy Value Badges
// -------------------------------
function clearValueBadges() {
    const container = document.getElementById("player-value-key");

    if (!container) return;

    container.querySelectorAll(".value-badge").forEach(badge => {
        badge.classList.remove("active");
    });
}


// -------------------------------
// DOM Badge Update
// -------------------------------
function updateIdentityBadge() {
    const xp = parseFloat(document.getElementById("xpScore").textContent);
    const skill = parseFloat(document.getElementById("overallScore").textContent);

    const identity = classifyPlayer(xp, skill);

    clearIdentityBadges();

    const badge = document.querySelector(`.identity-badge.${identity}`);
    if (badge) badge.classList.add("active");
}

function clearIdentityBadges() {
    document.querySelectorAll(".identity-badge").forEach(badge => {
        badge.classList.remove("active");
    });
}

// -------------------------------
// Fantasy Summary
// -------------------------------
function updateFantasySummary(identity, state, value) {

    const identityTitle = document.getElementById("summaryIdentity");
    const identityText  = document.getElementById("summaryIdentityText");

    const stateTitle = document.getElementById("summaryState");
    const stateText  = document.getElementById("summaryStateText");

    const valueTitle = document.getElementById("summaryValue");
    const valueText  = document.getElementById("summaryValueText");

    // -------------------------------
    // Fantasy Identity
    // -------------------------------
    const identityDescriptions = {
        breakout:
            "This player's production and underlying profile both indicate high-level performance.",

        overperformer:
            "This player's production is running ahead of the strength of their underlying profile.",

        sleeper:
            "This player's underlying profile is stronger than their current production tier suggests.",

        consistent:
            "This player's production and underlying profile are generally aligned.",

        neutral:
            "This player currently does not show a strong Fantasy Identity signal."
    };

    const identityLabels = {
        breakout: "Breakout Star",
        overperformer: "Overperformer",
        sleeper: "Sleeper Candidate",
        consistent: "Consistent Performer",
        neutral: "Neutral"
    };

    // -------------------------------
    // Fantasy State
    // -------------------------------
    const stateDescriptions = {
        strong:
            "Current production is outperforming the expected level implied by the player's underlying profile.",

        stable:
            "Current production is generally aligned with the player's underlying profile.",

        vulnerable:
            "Current production may be difficult to sustain relative to the player's underlying profile.",

        "high-risk":
            "Current production is showing significant instability relative to the player's underlying profile."
    };

    const stateLabels = {
        strong: "Strong",
        stable: "Stable",
        vulnerable: "Vulnerable",
        "high-risk": "High Risk"
    };

    // -------------------------------
    // Fantasy Value
    // -------------------------------
    const valueDescriptions = {
        extreme:
            "This player's overall performance is running far above the expected range.",

        elevated:
            "This player's overall performance is running above the expected range.",

        expected:
            "This player's overall performance is within the expected range.",

        below:
            "This player's overall performance is running below the expected range.",

        suppressed:
            "This player's overall performance is running well below the expected range."
    };

    const valueLabels = {
        extreme: "Extreme",
        elevated: "Elevated",
        expected: "Expected",
        below: "Below Expected",
        suppressed: "Suppressed"
    };

// -------------------------------
// Update DOM
// -------------------------------

// Identity
identityTitle.textContent =
    identityLabels[identity] || "--";

identityText.textContent =
    identityDescriptions[identity] || "";


// State
stateTitle.textContent =
    stateLabels[state] || "--";

stateText.textContent =
    stateDescriptions[state] || "";


// Value
valueTitle.textContent =
    valueLabels[value] || "--";

valueText.textContent =
    valueDescriptions[value] || "";

}


// -------------------------------
// Batter Tier Assignment
// -------------------------------
function getBatterTier(score) {
    if (score >= 8.5) return "Elite";
    if (score >= 7.0) return "Impact";
    if (score >= 5.5) return "Solid";
    if (score >= 4.0) return "Developing";
    return "Limited";
}


// -------------------------------
// Swap Button
// -------------------------------
document.getElementById("swapBtn").onclick = function () {
    const name1 = document.getElementById("playerName");
    const season1 = document.getElementById("seasonSelect");

    const name2 = document.getElementById("playerName2");
    const season2 = document.getElementById("seasonSelect2");

    const tempName = name1.value;
    const tempSeason = season1.value;

    name1.value = name2.value;
    season1.value = season2.value;

    name2.value = tempName;
    season2.value = tempSeason;

    // Trigger the correct load button
    document.getElementById("loadBtn").click();
};

// -------------------------------
// What to Watch - Placeholder State
// -------------------------------
function renderWatchPlaceholders() {

    const container = document.getElementById("watchGrid");

    if (!container) return;

    const placeholderCard = `
        <div class="watch-card watch-placeholder">

            <div class="watch-card-header">

                <div class="watch-placeholder-icon"></div>

                <div style="flex: 1;">
                    <span class="watch-placeholder-line title"></span>
                    <span class="watch-placeholder-line short"></span>
                </div>

            </div>

            <div class="watch-placeholder-body">
                <span class="watch-placeholder-line long"></span>
                <span class="watch-placeholder-line long"></span>
                <span class="watch-placeholder-line medium"></span>
            </div>

        </div>
    `;

    container.innerHTML =
        placeholderCard +
        placeholderCard +
        placeholderCard;
}

// -------------------------------
// Reset UI
// -------------------------------
function handleReset() {

        // Reset State Marker
const stateMarker = document.getElementById("stateMarker");

if (stateMarker) {
    stateMarker.style.top = "37.5%";
    stateMarker.style.opacity = "1";
}

        // Reset Value Marker
const valueMarker = document.getElementById("valueMarker");

if (valueMarker) {
    valueMarker.style.top = "50%";
    valueMarker.style.opacity = "1";
}

        // Reset Overall / XP gauges
const overallMeter =
    document.getElementById("overallMeter");

const xpMeter =
    document.getElementById("xpMeter");

if (overallMeter) {
    overallMeter.style.width = "3%";
}

if (xpMeter) {
    xpMeter.style.width = "3%";
}

    // Clear Season Production
    [
        "productionAB",
        "productionH",
        "productionR",
        "productionRBI",
        "productionHR",
        "productionBB",
        "productionK"
    ].forEach(id => {
        document.getElementById(id).textContent = "--";
    });


    console.log("RESET FIRED");


    // Clear What to Watch
    const watchGrid = document.getElementById("watchGrid");

    if (watchGrid) {
        watchGrid.innerHTML = "";
    }


    // Clear raw metric values
    document.querySelectorAll(".metric-raw")
        .forEach(el => el.textContent = "--");


    // Clear metric scores
    document.querySelectorAll(".metric-score")
        .forEach(el => el.textContent = "--");


    // Clear batteries
    document.querySelectorAll(".battery").forEach(el => {
        el.style.setProperty("--fill", "0%");
        el.style.setProperty("--color", "#d50000");
    });


    // Clear Player Analytics
document.getElementById("overallScore").textContent = "--";

document.getElementById("parkAdjustedOverall").textContent = "--";

const parkAdjustment = document.getElementById("parkAdjustment");
parkAdjustment.textContent = "";
parkAdjustment.classList.remove(
    "positive",
    "negative",
    "neutral",
    "premium-label"
);

document.getElementById("parkVenue").textContent = "--";
document.getElementById("parkFactor").textContent = "--";

document.getElementById("overallTier").innerHTML = "--";
document.getElementById("scoutingNote").innerHTML = "--";
document.getElementById("overallPercentile").textContent = "--";
document.getElementById("xpScore").innerHTML = "--";
document.getElementById("playerTab").textContent = "Player:--";
document.getElementById("playerArchetype").textContent = "--";
document.getElementById("playerArchetypeMatch").textContent = "--";


    // Clear Fantasy Edge badges/What to Watch
    clearIdentityBadges();
    clearStateBadges();
    clearValueBadges();
    renderWatchPlaceholders();
    resetTeamColorPanel();
    resetSimilarProfiles();


    // Clear Fantasy Summary
    document.getElementById("summaryIdentity").textContent = "--";
    document.getElementById("summaryIdentityText").textContent =
        "Load a player to view their Fantasy Identity analysis.";

    document.getElementById("summaryState").textContent = "--";
    document.getElementById("summaryStateText").textContent =
        "Load a player to view their Fantasy State analysis.";

    document.getElementById("summaryValue").textContent = "--";
    document.getElementById("summaryValueText").textContent =
        "Load a player to view their Fantasy Value analysis.";

    console.log("RESET: about to restore access UI");
updateAccessUI();
}
// -------------------------------
// Latest Update Timestamp Defined
// -------------------------------
const currentSeason = document.getElementById("seasonSelect").value;

// -------------------------------
// Latest Update Timestamp (Improved)
// -------------------------------
async function loadLastUpdated(season) {
    const url = `https://batter-analyzer-backend.onrender.com/api/last-updated/batters/${season}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network error");

        const data = await res.json();
        const raw = data?.lastUpdated;

        const el = document.getElementById('lastUpdated');

        // Handle missing or invalid date
        if (!raw) {
            el.textContent = "Last updated: unavailable";
            return;
        }

        const date = new Date(raw);
        if (isNaN(date.getTime())) {
            el.textContent = "Last updated: invalid date";
            return;
        }

        const formatted = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }).format(date);

        el.textContent = `Last updated on ${formatted}`;

    } catch (err) {
        document.getElementById('lastUpdated').textContent =
            "Last updated: error loading timestamp";
    }
}

// -------------------------------
// Wire up UI buttons
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {

    renderWatchPlaceholders();

    // Main buttons
    document.getElementById("loadBtn")
        .addEventListener("click", handleLoad);

    document.getElementById("resetBtn")
        .addEventListener("click", handleReset);


    // ------------------------------
    // All Access Buttons
    // ------------------------------

    document.getElementById("compareBtn")
        .addEventListener("click", () => {

            if (!requireAllAccess("Player Comparison")) {
                return;
            }

            showCompareModal();
        });


    document.getElementById("leadersBtn")
        .addEventListener("click", () => {

            if (!requireAllAccess("Leaders")) {
                return;
            }

            loadLeaders();
        });


    document.getElementById("trendBtn")
        .addEventListener("click", () => {

            if (!requireAllAccess("Trend Analysis")) {
                return;
            }

            handleTrend();
        });


    // Apply Free Trial / All Access appearance
    updateAccessUI();


    // Timestamp
    loadLastUpdated(currentSeason);


    // Close modals
    document.getElementById("trendClose").onclick = () =>
        document.getElementById("trendModal").style.display = "none";

    document.getElementById("leadersClose").onclick = () =>
        document.getElementById("leadersModal").style.display = "none";

    document.getElementById("compareClose").onclick = () =>
        document.getElementById("compareModal").style.display = "none";


    // Click outside to close Leaders
    window.addEventListener("click", (e) => {

        const modal =
            document.getElementById("leadersModal");

        if (e.target === modal) {
            modal.style.display = "none";
        }

    });

});
