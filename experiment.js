// Inicjalizacja jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        const data = jsPsych.data.get();
        const dataArray = data.values();
        if (dataArray.length > 0) {
            const narrationData = data.filter({ phase: 'narration' }).csv();
            if (narrationData.split('\n').length > 1) {
                saveDataToOSF(narrationData, `results_narration_${participantId}.csv`);
            }
            const recognitionData = data.filter({ phase: 'recognition' }).csv();
            if (recognitionData.split('\n').length > 1) {
                saveDataToOSF(recognitionData, `results_recognition_${participantId}.csv`);
            }
        } else {
            console.log("Brak danych do zapisania (brak rekordów).");
        }
    },
    use_webaudio: false
});

// Funkcja do zapisu danych (przykładowa implementacja)
const participantId = Math.random().toString(36).substring(2, 15);
function saveDataToOSF(data, filename) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Dane eksperymentu
const wordLists = {
    "LEKARZ": ["choroba", "pielęgniarka", "stetoskop", "doktor", "kitel", "pomoc", "fartuch", "szpital", "słuchawki", "recepta", "specjalista", "zdrowie", "pediatra", "pacjent", "lek"],
    "WYSOKI": ["niski", "mężczyzna", "chłopak", "brunet", "dąb", "koszykarz", "poziom", "słup", "przystojny", "budynek", "siatkarz", "szczupły", "długi", "wieżowiec", "drabina"],
    "ŻYCZENIE": ["marzenie", "prezent", "urodziny", "ostatnie", "rozkaz", "święta", "kartka", "magia", "spełnienie", "wróżba", "rybka", "nadzieja", "prośba", "gwiazdka", "pragnienie"],
    "GWIZDEK": ["mecz", "w-f", "sędzia", "głośny", "hałas", "trener", "koniec", "dźwięk", "sport", "policjant", "gwizd", "czajnik", "świst", "sygnał", "piłka"]
};

// Losowa kolejność list
const listOrder = jsPsych.randomization.shuffle(["LEKARZ", "ŻYCZENIE", "WYSOKI", "GWIZDEK"]);

// Lista słów do fazy rozpoznawania
const recognitionList = [
    "stetoskop", "kitel", "fartuch", "słuchawki", "pediatra",  // LEKARZ
    "urodziny", "rozkaz", "kartka", "spełnienie", "prośba",    // ŻYCZENIE
    "chłopak", "dąb", "poziom", "przystojny", "długi",         // WYSOKI
    "sędzia", "hałas", "koniec", "sport", "piłka",             // GWIZDEK
    "apteka", "most", "balon", "telewizor", "księżyc"          // Dystraktory
];

// Losowe przemieszanie słów w fazie rozpoznawania
const shuffledRecognitionList = jsPsych.randomization.shuffle(recognitionList);

// Timeline eksperymentu
const timeline = [];

// Instrukcje początkowe
const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Witamy w badaniu!</h2>
        <p>Twoim zadaniem jest zapamiętanie słów z list.</p>
        <p>Kliknij poniżej, aby zacząć.</p>
    `,
    choices: ['Rozpocznij'],
    data: { phase: 'instructions' }
};
timeline.push(instructions);

// Informacja o teście
const testInfo = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Zaraz zacznie się test</h2>
        <p>Przygotuj się do zapamiętywania słów.</p>
        <p>Kliknij, aby kontynuować.</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'narration' }
};
timeline.push(testInfo);

// Wyświetlanie list słów (faza narracji)
for (let i = 0; i < listOrder.length; i++) {
    const listName = listOrder[i];
    const wordList = wordLists[listName];

    for (const word of wordList) {
        const wordTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${word}</h1>`,
            choices: "NO_KEYS",
            trial_duration: 1000,
            response_ends_trial: false,
            post_trial_gap: 500,
            data: { phase: 'narration', list_name: listName, word: word }
        };
        timeline.push(wordTrial);
    }
}

// Faza rozpoznawania z skalą
const recognitionIntro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <p>Teraz ocenisz, czy słowa pojawiły się wcześniej.</p>
        <p>Użyj skali od "Zdecydowanie nie" do "Zdecydowanie tak".</p>
        <p>Zacznij, klikając poniżej.</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'recognition' }
};
timeline.push(recognitionIntro);

for (const word of shuffledRecognitionList) {
    const recognitionTrial = {
        type: jsPsychSurveyLikert,
        questions: [
            {
                prompt: `<h1>${word}</h1><p>Czy to słowo było na liście?</p>`,
                labels: ["Zdecydowanie nie", "Raczej nie", "Nie wiem", "Raczej tak", "Zdecydowanie tak"],
                required: true,
                name: `recognition_${word}`
            }
        ],
        data: { phase: 'recognition', word: word }
    };
    timeline.push(recognitionTrial);
}

// Zakończenie
const endMessage = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Dziękujemy!</h2>
        <p>Eksperyment zakończony.</p>
    `,
    choices: ['Zakończ'],
    data: { phase: 'end' }
};
timeline.push(endMessage);

// Uruchomienie eksperymentu
jsPsych.run(timeline);
