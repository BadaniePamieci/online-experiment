// Dane eksperymentu
const wordLists = {
    "LEKARZ": ["choroba", "pielęgniarka", "stetoskop", "doktor", "kitel", "pomoc", "fartuch", "szpital", "słuchawki", "recepta", "specjalista", "zdrowie", "pediatra", "pacjent", "lek"],
    "WYSOKI": ["niski", "mężczyzna", "chłopak", "brunet", "dąb", "koszykarz", "poziom", "słup", "przystojny", "budynek", "siatkarz", "szczupły", "długi", "wieżowiec", "drabina"],
    "ŻYCZENIE": ["marzenie", "prezent", "urodziny", "ostatnie", "rozkaz", "święta", "kartka", "magia", "spełnienie", "wróżba", "rybka", "nadzieja", "prośba", "gwiazdka", "pragnienie"],
    "GWIZDEK": ["mecz", "w-f", "sędzia", "głośny", "hałas", "trener", "koniec", "dźwięk", "sport", "policjant", "gwizd", "czajnik", "świst", "sygnał", "piłka"]
};

const narratives = {
    "LEKARZ": {
        "critical": "Wyobraź sobie, że siedzisz w zatłoczonej poczekalni szpitala. Przez uchylone drzwi gabinetu widzisz pielęgniarkę, która pobiera krew nastolatkowi. W pomieszczeniu obok ktoś ubrany na biało słucha staruszki opisującej kaszel. Przez korytarz przechodzi pacjent z receptą w dłoni, którą wypisał mu ktoś przed chwilą. Czekasz na pomoc, a chłodne powietrze i stukot klawiatur sprawiają, że chcesz jak najszybciej iść do domu.",
        "non_critical": "Wyobraź sobie, że siedzisz w zatłoczonej poczekalni szpitala. Przez uchylone drzwi gabinetu widzisz pielęgniarkę, która pobiera krew nastolatkowi. Przez korytarz przechodzi pacjent z czymś w ręku. To pewnie recepta, na leki, których koniecznie potrzebuje. Czekasz na pomoc, a chłodne powietrze i stukot klawiatur sprawiają, że chcesz jak najszybciej iść do domu.",
        "neutral": "Wyobraź sobie, że siedzisz w cichej czytelni biblioteki. Przez półotwarte drzwi widzisz osobę układającą książki na półce. Obok Ciebie studentka przewraca strony notesu, szukając ważnego cytatu. Na środku stolik z gazetami, a przez okno wpada ciepłe światło poranka. Czekasz na otwarcie archiwum, a szelest papieru i zapach kawy sprawiają, że czujesz się wspaniale."
    },
    "WYSOKI": {
        "critical": "Wyobraź sobie, że przechodzisz przez park w centrum miasta. Obok ciebie mężczyzna w koszulce sportowej przygotowuje się do gry. Wielki koszykarz rozciąga się przed meczem, opierając dłonie o słup, który sięga ponad korony drzew. Dookoła parku stoją ogromne wieżowce o szklanych fasadach, rzucające cień na całą okolicę. Zastanawiasz się, jak ludzie wznoszą takie budynki, które wydają się dotykać nieba.",
        "non_critical": "Wyobraź sobie, że przechodzisz przez park w centrum miasta. Obok ciebie mężczyzna w koszulce sportowej przygotowuje się do gry. Koszykarz rozciąga się przed meczem, opierając dłonie o słup, który stoi przy boisku. Dookoła parku stoją wieżowce o szklanych fasadach, rzucające cień na całą okolicę. Jesteś zachwycony ich wykonaniem i zastanawiasz się, jak ludzie wznoszą takie budynki.",
        "neutral": "Wyobraź sobie, że siedzisz w kawiarni na starym rynku. Przez okno obserwujesz turystów fotografujących fontannę z posągiem Neptuna. Kelnerka w fartuchu w kratkę nalewa Ci herbatę do filiżanki z motywem kotów. Zapach świeżo mielonej kawy miesza się z dźwiękiem delikatnego jazzu, a Ty zastanawiasz się, czy wybrać sernik czy makowiec."
    },
    "ŻYCZENIE": {
        "critical": "Wyobraź sobie, że siedzisz przy stole wigilijnym. Na choince migocze gwiazdka, a pod nią leży prezent owinięty w złoty papier. Babcia cieszy się z magii świąt i z tego, że wszyscy przyjechali do niej. Podchodzicie do siebie i mówicie sobie miłe słowa na nowy rok. W kącie stoi talerz z ciasteczkami z wróżbą, które mają zdecydować o Twojej przyszłości, chociaż sam w to nie wierzysz. Wolisz dzielić się opłatkiem i mówić, czego pragniesz dla bliskich.",
        "non_critical": "Wyobraź sobie, że siedzisz przy stole wigilijnym. Na choince migocze gwiazdka, a pod nią leży prezent owinięty w złoty papier. Babcia cieszy się z magii świąt i z tego, że wszyscy przyjechali do niej. Podchodzi do ciebie i całuje cię w policzek. W kącie stoi talerz z ciasteczkami z wróżbą, które mają zdecydować o Twojej przyszłości, chociaż sam w to nie wierzysz. Otwierasz jedno i z uśmiechem je czytasz.",
        "neutral": "Wyobraź sobie, że stoisz na stacji benzynowej o północy. Na półce leżą przekąski i napoje, a kasjerka w niebieskim uniformie rozmawia przez telefon. W powietrzu unosi się zapach gumy and oleju. Kupujesz batonik i zastanawiasz się, czy zdążysz dojechać do domu. Masz nadzieję, że ktoś na ciebie poczeka, bo nie masz klucza od domu."
    },
    "GWIZDEK": {
        "critical": "Wyobraź sobie, że jesteś na sali gimnastycznej podczas w-f. Trener krzyczy, byście ustawili się w rzędzie. Słyszysz wysoki dźwięk na zewnątrz i nie skupiasz się na lekcji. Za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym, wydając ostre dźwięki. Zapatrzony w okno słyszysz niechciany sygnał, i wiesz, że musisz zacząć biegać okrążenia.",
        "non_critical": "Wyobraź sobie, że jesteś na sali gimnastycznej podczas w-f. Trener krzyczy, byście ustawili się w rzędzie. Ty jednak nie skupiasz się na lekcji, bo za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym. Zapatrzony w okno słyszysz dźwięk trenera, który mówi, że musisz się skupić. To twój sygnał, żeby nie patrzeć więcej przez okno.",
        "neutral": "Wyobraź sobie, że przeglądasz stare zdjęcia w albumie na poddaszu babci. Kurz unosi się w promieniach słońca wpadających przez okno, a na półkach stoją pudełka z porcelanowymi figurkami. Na jednym ze zdjęć widzisz siebie jako dziecko, trzymającego pluszowego misia w kapeluszu. Pachnie tu lawendą i starą drewnianą podłogą. Zastanawiasz się, czy zabrać któreś zdjęcie do ramki."
    }
};

const listOrder = ["LEKARZ", "ŻYCZENIE", "WYSOKI", "GWIZDEK"];
const groups = {
    "critical": ["critical", "critical", "critical", "critical"],
    "non_critical": ["non_critical", "non_critical", "non_critical", "non_critical"],
    "neutral": ["neutral", "neutral", "neutral", "neutral"]
};

const fullRecognitionList = [
    "stetoskop", "kitel", "fartuch", "słuchawki", "pediatra",
    "urodziny", "rozkaz", "kartka", "spełnienie", "prośba",
    "chłopak", "dąb", "poziom", "przystojny", "długi",
    "sędzia", "hałas", "koniec", "sport", "piłka",
    "lekarz", "życzenie", "wysoki", "gwizdek",
    "apteka", "most", "balon", "telewizor", "księżyc",
    "piasek", "motyl", "laptop", "rower", "zegar"
];

const mathTasks = [
    { question: "2 + 3 × 4 =", answer: 14 },
    { question: "5 × 2 - 1 =", answer: 9 },
    { question: "4 + 6 ÷ 2 =", answer: 7 },
    { question: "10 ÷ 2 × 3 =", answer: 15 },
    { question: "7 - 3 × 2 =", answer: 1 }
];

// Rozszerzone funkcje zapisu danych
const DataSaver = {
    saveAsJSON: (data, filename) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `data_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    saveAsCSV: (data, filename) => {
        const escapeCsv = str => `"${String(str).replace(/"/g, '""')}"`;
        const headers = Object.keys(data[0] || {});
        const csvRows = [
            headers.join(','),
            ...data.map(row => 
                headers.map(field => 
                    escapeCsv(row[field] ?? '')
                .join(','))
        ];
        const blob = new Blob(["\uFEFF"+csvRows.join('\r\n')], {type: 'text/csv;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `data_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    saveToOSF: async (data, experimentID) => {
        try {
            const response = await fetch('https://pipe.jspsych.org/api/data', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    experimentID: experimentID || 'nIbjy3keQoaX',
                    filename: `results_${Date.now()}.csv`,
                    data: data
                })
            });
            return await response.json();
        } catch (error) {
            console.error('OSF Save Error:', error);
            return {error: error.message};
        }
    }
};

// Inicjalizacja jsPsych z rozszerzonym zapisem danych
const jsPsych = initJsPsych({
    on_finish: function() {
        const rawData = jsPsych.data.get().values();
        const participantId = `participant_${Date.now()}`;
        
        // Przetwarzanie danych
        const processedData = rawData.map(trial => ({
            participant_id: trial.participant_id || participantId,
            trial_type: trial.trial_type,
            trial_index: trial.trial_index,
            time_elapsed: trial.time_elapsed,
            phase: this.getTrialPhase(trial),
            stimulus: this.cleanHtml(trial.stimulus),
            response: trial.response,
            rt: trial.rt,
            correct: this.determineCorrectness(trial),
            list_name: trial.list_name,
            word: trial.word,
            math_question: trial.math_question,
            math_response: trial.response,
            confidence: trial.response,
            timestamp: new Date().toISOString()
        }));
        
        // Zapis danych
        DataSaver.saveAsJSON(rawData, `${participantId}_full.json`);
        DataSaver.saveAsCSV(processedData, `${participantId}_processed.csv`);
        DataSaver.saveToOSF(jsPsych.data.get().csv());
    },
    
    getTrialPhase: function(trial) {
        if (trial.list_name) return 'word_learning';
        if (trial.sentence) return 'narration';
        if (trial.math_question) return 'math_task';
        if (trial.word && trial.is_target !== undefined) return 'recognition';
        return 'other';
    },
    
    cleanHtml: function(html) {
        return html ? String(html).replace(/<[^>]+>/g, '').trim() : '';
    },
    
    determineCorrectness: function(trial) {
        if (trial.math_question) {
            const task = mathTasks.find(t => t.question === trial.math_question);
            return task ? (parseInt(trial.response) === task.answer) : null;
        }
        if (trial.word && trial.is_target !== undefined) {
            return trial.is_target === (trial.response === 'Tak');
        }
        return null;
    },
    
    use_webaudio: false
});

// Globalny listener dla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') jsPsych.endExperiment('Eksperyment przerwany przez uczestnika');
});

// Funkcje pomocnicze
function assignToGroup() {
    const groupNames = Object.keys(groups);
    return groupNames[Math.floor(Math.random() * groupNames.length)];
}

// Timeline eksperymentu
const timeline = [];
const participantId = `participant_${Date.now()}`;
const group = assignToGroup();

// Instrukcje
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Badanie pamięci</h2>
        <p>Wszystkie dane są anonimowe. Kliknij poniżej, aby rozpocząć.</p>
        <p>Możesz w każdej chwili przerwać badanie naciskając klawisz ESC.</p>
    `,
    choices: ['Rozpocznij'],
    data: { phase: 'instructions' }
});

// Dane demograficzne
timeline.push({
    type: jsPsychSurveyText,
    questions: [
        { prompt: "Wiek:", name: 'age', required: true, input_type: 'number' },
        { prompt: "Płeć:", name: 'gender', required: true, placeholder: 'Kobieta/Mężczyzna/Inna' }
    ],
    data: { participant_id: participantId, group: group, phase: 'demographics' }
});

// Ekran przygotowawczy
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Test pamięciowy</h2>
        <p>Za chwilę zobaczysz serię słów do zapamiętania.</p>
        <p>Przygotuj się i kliknij poniżej, aby rozpocząć.</p>
    `,
    choices: ['Gotowy'],
    data: { phase: 'preparation' }
});

// Główna pętla eksperymentu
for (let i = 0; i < listOrder.length; i++) {
    const listName = listOrder[i];
    const wordList = wordLists[listName];

    // Wyświetlanie słów
    for (const word of wordList) {
        timeline.push({
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${word}</h1>`,
            choices: ['no_response'],
            trial_duration: 1000,
            response_ends_trial: false,
            post_trial_gap: 500,
            data: { 
                participant_id: participantId,
                group: group,
                phase: 'word_presentation',
                list_name: listName,
                word: word,
                trial_number: i + 1
            }
        });
    }

    // Narracje
    const narrationType = groups[group][i];
    const narrationText = narratives[listName][narrationType];
    const sentences = narrationText.split('.').filter(s => s.trim());

    timeline.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <h3>Część narracyjna</h3>
            <p>Przeczytaj uważnie poniższe zdania.</p>
            <p>Kliknij przycisk, aby kontynuować.</p>
        `,
        choices: ['Dalej'],
        data: { phase: 'narration_instructions' }
    });

    for (let j = 0; j < sentences.length; j++) {
        timeline.push({
            type: jsPsychHtmlButtonResponse,
            stimulus: `
                <p>${sentences[j].trim()}.</p>
                <p>Kliknij przycisk, aby kontynuować.</p>
            `,
            choices: ['Dalej'],
            data: { 
                participant_id: participantId,
                phase: 'narration',
                list_name: listName,
                sentence_number: j + 1,
                sentence: sentences[j].trim()
            }
        });
    }

    // Przerwa między blokami
    if (i < listOrder.length - 1) {
        timeline.push({
            type: jsPsychHtmlButtonResponse,
            stimulus: `
                <p>Krótka przerwa...</p>
                <p>Przygotuj się na następną część.</p>
            `,
            choices: ['Kontynuuj'],
            data: { phase: 'break' }
        });
    }
}

// Zadania matematyczne
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Zadania matematyczne</h2>
        <p>Rozwiąż następujące zadania:</p>
    `,
    choices: ['Rozpocznij'],
    data: { phase: 'math_instructions' }
});

for (const task of mathTasks) {
    timeline.push({
        type: jsPsychSurveyText,
        questions: [{
            prompt: task.question,
            name: 'math_response',
            required: true,
            input_type: 'number'
        }],
        data: {
            participant_id: participantId,
            phase: 'math_task',
            math_question: task.question,
            correct_answer: task.answer
        }
    });
}

// Faza rozpoznawania
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Test rozpoznawania</h2>
        <p>Określ czy słowo pojawiło się wcześniej.</p>
        <p>Po każdej odpowiedzi ocenisz swoją pewność.</p>
    `,
    choices: ['Rozumiem'],
    data: { phase: 'recognition_instructions' }
});

const shuffledRecognitionList = jsPsych.randomization.shuffle([...fullRecognitionList]);
for (const word of shuffledRecognitionList) {
    timeline.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: `<div class="recognition-word"><h1>${word}</h1></div>`,
        choices: ['Tak', 'Nie'],
        prompt: '<p>Czy to słowo pojawiło się wcześniej?</p>',
        data: { 
            participant_id: participantId,
            phase: 'recognition',
            word: word,
            is_target: fullRecognitionList.slice(0, 24).includes(word)
        }
    });

    timeline.push({
        type: jsPsychSurveyLikert,
        questions: [{
            prompt: `Pewność odpowiedzi:`,
            name: 'confidence',
            labels: ['1 (niska)', '2', '3', '4', '5 (wysoka)'],
            required: true
        }],
        data: {
            participant_id: participantId,
            phase: 'confidence_rating',
            word: word
        }
    });
}

// Zakończenie
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Badanie zakończone</h2>
        <p>Dziękujemy za udział!</p>
        <p>Twoje dane zostały zapisane.</p>
    `,
    choices: ['Zakończ'],
    data: { phase: 'end' }
});

// Uruchomienie eksperymentu
jsPsych.run(timeline);
