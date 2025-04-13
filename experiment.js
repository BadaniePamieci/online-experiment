const jsPsych = initJsPsych({
    on_finish: function() {
        const data = jsPsych.data.get();
        if (data.count() > 0) {
            const csvData = data.csv();
            saveDataToOSF(csvData, `results_${group}_${participantId}.csv`);
        }
    },
    use_webaudio: false
});

const participantId = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 15);

let groupCounter = localStorage.getItem('groupCounter') ? parseInt(localStorage.getItem('groupCounter')) : 0;
const groupNames = ["critical", "non_critical", "neutral"];
const group = groupNames[groupCounter % groupNames.length];
groupCounter = (groupCounter + 1) % groupNames.length;
localStorage.setItem('groupCounter', groupCounter);

async function saveDataToOSF(data, filename) {
    try {
        const response = await fetch('https://pipe.jspsych.org/api/data', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                experimentID: 'nIbjy3keQoaX',
                filename: filename,
                data: data
            })
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
        console.error('Błąd zapisu:', error);
        alert('Problem z zapisem danych. Skontaktuj się z badaczem.');
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        jsPsych.endExperiment('Badanie przerwane przez użytkownika (ESC).');
    }
});

const wordLists = {
    "LEKARZ": ["choroba", "pielęgniarka", "stetoskop", "doktor", "kitel", "pomoc", "fartuch", "szpital", "słuchawki", "recepta", "specjalista", "zdrowie", "pediatra", "pacjent", "lek"],
    "WYSOKI": ["niski", "mężczyzna", "chłopak", "brunet", "dąb", "koszykarz", "poziom", "słup", "przystojny", "budynek", "siatkarz", "szczupły", "długi", "wieżowiec", "drabina"],
    "SPRAGNIONY": ["pustynia", "potrzeba", "sprite", "napój", "oaza", "cytryna", "upadł", "picie", "pepsi", "głodny", "sportowiec", "bieganie", "woda", "cola", "kac"],
    "GWIZDEK": ["mecz", "w-f", "sędzia", "głośny", "hałas", "trener", "koniec", "dźwięk", "sport", "policjant", "gwizd", "czajnik", "świst", "sygnał", "piłka"]
};

const narratives = {
    "LEKARZ": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy...",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy...",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy..."
    },
    "WYSOKI": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy...",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy...",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy..."
    },
    "SPRAGNIONY": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy...",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy...",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy..."
    },
    "GWIZDEK": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy...",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy...",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy..."
    }
};

const criticalWords = ["lekarz", "wysoki", "spragniony", "gwizdek"];
const commonWords = ["drzwi", "koszulka", "kelner", "młody"];
const listWords = [
    "stetoskop", "kitel", "słuchawki", "pediatra",
    "chłopak", "dąb", "przystojny", "długi",
    "sprite", "oaza", "pepsi", "woda",
    "sędzia", "hałas", "sport", "piłka"
];
const controlWords = ["farby", "miska", "pies", "telefon", "makaron", "korona", "dżungla", "medal"];
const fixedOrderWords = [...criticalWords, ...commonWords, ...listWords, ...controlWords];

let recognitionData = [];
const listOrder = jsPsych.randomization.shuffle(["LEKARZ", "WYSOKI", "SPRAGNIONY", "GWIZDEK"]);
const timeline = [];

// ========== EKRANY STARTOWE ==========
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Badanie pamięci online</h2>
        <p>To badanie zajmie około 20 minut. Prosimy wykonać je w skupieniu...</p>
        <p>Jeśli naciśniesz ESC, Twoje dane nie będą brane pod uwagę...</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'welcome', participant_id: participantId, group: group }
});

timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Witamy w badaniu pamięci</h2>
        <p>W tym badaniu wyświetlone zostaną listy słów...</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions', participant_id: participantId, group: group }
});

// ========== DEMOGRAFIA ==========
timeline.push({
    type: jsPsychSurveyText,
    questions: [
        { prompt: "Podaj swój wiek:", name: 'age', required: true, input_type: 'number' },
        { prompt: "Podaj płeć:", name: 'gender', required: true }
    ],
    data: { phase: 'demographics', participant_id: participantId, group: group }
});

// ========== LISTY SŁÓW ==========
for (let i = 0; i < listOrder.length; i++) {
    const listName = listOrder[i];
    wordLists[listName].forEach(word => {
        timeline.push({
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${word}</h1>`,
            choices: ['no_response'],
            trial_duration: 1000,
            data: {
                participant_id: participantId,
                group: group,
                list_name: listName,
                word: word,
                phase: 'word_list'
            }
        });
    });

    // ========== NARRACJE ==========
    const narrationType = group === 'critical' ? 'critical' : group === 'non_critical' ? 'non_critical' : 'neutral';
    const sentences = narratives[listName][narrationType].split('. ').filter(s => s);
    
    timeline.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: '<p>Przeczytaj zdania i kliknij Dalej...</p>',
        choices: ['Dalej'],
        data: { phase: 'narration_instructions' }
    });

    sentences.forEach((sentence, idx) => {
        timeline.push({
            type: jsPsychHtmlButtonResponse,
            stimulus: `<p>Zdanie ${idx+1}:</p><p>${sentence}</p>`,
            choices: ['Dalej'],
            data: { 
                phase: 'narration',
                sentence_number: idx+1,
                sentence: sentence 
            }
        });
    });

    if (i < listOrder.length - 1) {
        timeline.push({
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>Krótka przerwa...</p>',
            choices: ['Dalej'],
            data: { phase: 'break' }
        });
    }
}

// ========== ZADANIA MATEMATYCZNE ==========
const mathTasks = [
    { question: "2 + 2 × 3 =", answer: 8 },
    { question: "4 × 5 - 3 =", answer: 17 },
    { question: "3 + 4 × 2 =", answer: 11 },
    { question: "5 × 6 - 4 =", answer: 26 },
    { question: "8 ÷ 2 + 3 =", answer: 7 }
];

timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: '<p>Teraz rozwiąż zadania matematyczne...</p>',
    choices: ['Rozpocznij'],
    data: { phase: 'math_instructions' }
});

mathTasks.forEach(task => {
    timeline.push({
        type: jsPsychSurveyText,
        questions: [{ prompt: task.question, name: 'math_response', required: true }],
        data: { 
            phase: 'math_task',
            correct_answer: task.answer 
        }
    });
});

// ========== FAZA ROZPOZNAWANIA ==========
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: '<p>Teraz ocenisz czy słowa były na listach...</p>',
    choices: ['Rozpocznij'],
    data: { phase: 'recognition_instructions' }
});

const shuffledRecognitionList = jsPsych.randomization.shuffle(fixedOrderWords);

shuffledRecognitionList.forEach(word => {
    // Próba rozpoznania
    timeline.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: `<h1>${word}</h1>`,
        choices: ['Tak', 'Nie'],
        data: { 
            phase: 'recognition',
            word: word,
            is_target: wordLists[listOrder[0]].includes(word) || 
                      wordLists[listOrder[1]].includes(word) || 
                      wordLists[listOrder[2]].includes(word) || 
                      wordLists[listOrder[3]].includes(word)
        },
        on_finish: function(data) {
            recognitionData.push({
                Stimulus: word,
                Response: data.response === 0 ? "Tak" : "Nie",
                ConfidenceResponse: null
            });
        }
    });

    // Ocena pewności
    timeline.push({
        type: jsPsychSurveyLikert,
        questions: [{
            prompt: `Pewność dla słowa "${word}":`,
            labels: ['1 (brak pewności)', '2', '3', '4', '5 (całkowita pewność)'],
            name: `confidence_${word}`
        }],
        on_finish: function(data) {
            const confidence = parseInt(data.response[`confidence_${word}`]) + 1;
            const entry = recognitionData.find(item => item.Stimulus === word);
            if (entry) entry.ConfidenceResponse = confidence;
        }
    });
});

// ========== ZAPIS FINALNYCH DANYCH ==========
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: '<h2>Dziękujemy!</h2><p>Kliknij Zakończ...</p>',
    choices: ['Zakończ'],
    on_finish: function() {
        const finalSummary = fixedOrderWords.map(word => 
            recognitionData.find(item => item.Stimulus === word) || 
            { Stimulus: word, Response: "Brak", ConfidenceResponse: "Brak" }
        );
        
        jsPsych.data.get().addToAll({
            ConfidenceFinalSummary: JSON.stringify(finalSummary)
        });
    }
});

jsPsych.run(timeline);
