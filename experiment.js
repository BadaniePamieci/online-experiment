// Inicjalizacja jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData(); // Wyświetla dane w konsoli (bez zapisu na razie)
    }
});

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

// Bardziej złożone zadania matematyczne
const mathTasks = [
    { question: "2 + 2 × 3 =", answer: 8 },  // 2 + 6 = 8
    { question: "4 × 5 - 3 =", answer: 17 }, // 20 - 3 = 17
    { question: "3 + 4 × 2 =", answer: 11 }, // 3 + 8 = 11
    { question: "5 × 6 - 4 =", answer: 26 }, // 30 - 4 = 26
    { question: "8 ÷ 2 + 3 =", answer: 7 }   // 4 + 3 = 7
];

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
    choices: ['Rozpocznij']
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
    choices: ['Przejdź dalej']
};
timeline.push(testInfo);

// Wyświetlanie list słów
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
            post_trial_gap: 500
        };
        timeline.push(wordTrial);
    }
}

// Zadania matematyczne
const mathIntro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <p>Rozwiąż kilka zadań matematycznych.</p>
        <p>Kliknij, aby kontynuować.</p>
    `,
    choices: ['Przejdź dalej']
};
timeline.push(mathIntro);

for (const task of mathTasks) {
    const mathTrial = {
        type: jsPsychSurveyText,
        questions: [
            { prompt: task.question, name: `math_${task.question}`, required: true }
        ]
    };
    timeline.push(mathTrial);
}

// Faza rozpoznawania
const recognitionIntro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <p>Teraz ocenisz, czy słowa pojawiły się wcześniej.</p>
        <p>Kliknij "Tak" lub "Nie".</p>
        <p>Zacznij, klikając poniżej.</p>
    `,
    choices: ['Przejdź dalej']
};
timeline.push(recognitionIntro);

for (const word of shuffledRecognitionList) {
    const recognitionTrial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<h1>${word}</h1>`,
        choices: ['Tak', 'Nie'],
        prompt: '<p>Czy to słowo było na liście?</p>'
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
    choices: ['Zakończ']
};
timeline.push(endMessage);

// Uruchomienie eksperymentu
jsPsych.run(timeline);
