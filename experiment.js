// Inicjalizacja jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        const data = jsPsych.data.get();
        const dataArray = data.values();
        if (dataArray.length > 0) {
            const csvData = data.csv();
            saveDataToOSF(csvData, `results_${group}_${participantId}.csv`);
        } else {
            console.log("Brak danych do zapisania (brak rekordów).");
        }
    },
    use_webaudio: false
});

// Dane uczestnika
const participantId = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 15);

// Mechanizm sekwencyjnego przypisania grup
let groupCounter = localStorage.getItem('groupCounter') ? parseInt(localStorage.getItem('groupCounter')) : 0;
const groupNames = ["critical", "non_critical", "neutral"];
const group = groupNames[groupCounter % groupNames.length];

// Zwiększ licznik po przypisaniu grupy
groupCounter = (groupCounter + 1) % groupNames.length;
localStorage.setItem('groupCounter', groupCounter);

// Funkcja zapisu danych
async function saveDataToOSF(data, filename) {
    try {
        const response = await fetch('https://pipe.jspsych.org/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                experimentID: 'nIbjy3keQoaX', // Twój Experiment ID z DataPipe
                filename: filename,
                data: data
            })
        });
        if (!response.ok) {
            throw new Error('Błąd zapisu danych na OSF: ' + response.statusText);
        }
        return response.json();
    } catch (error) {
        console.error('Wystąpił błąd podczas zapisywania danych:', error);
        alert('Wystąpił problem z zapisem danych. Skontaktuj się z badaczem.');
    }
}

// Globalny listener dla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        console.log("Naciśnięto ESC – kończę eksperyment.");
        jsPsych.endExperiment('Eksperyment zakończony przez użytkownika.');
    }
});

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
        "neutral": "Wyobraź sobie, że stoisz na stacji benzynowej o północy. Na półce leżą przekąski i napoje, a kasjerka w niebieskim uniformie rozmawia przez telefon. W powietrzu unosi się zapach gumy i oleju. Kupujesz batonik i zastanawiasz się, czy zdążysz dojechać do domu. Masz nadzieję, że ktoś na ciebie poczeka, bo nie masz klucza od domu."
    },
    "GWIZDEK": {
        "critical": "Wyobraź sobie, że jesteś na sali gimnastycznej podczas w-f. Trener krzyczy, byście ustawili się w rzędzie. Słyszysz wysoki dźwięk na zewnątrz i nie skupiasz się na lekcji. Za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym, wydając ostre dźwięki. Zapatrzony w okno słyszysz niechciany sygnał, i wiesz, że musisz zacząć biegać okrążenia.",
        "non_critical": "Wyobraź sobie, że jesteś na sali gimnastycznej podczas w-f. Trener krzyczy, byście ustawili się w rzędzie. Ty jednak nie skupiasz się na lekcji, bo za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym. Zapatrzony w okno słyszysz dźwięk trenera, który mówi, że musisz się skupić. To twój sygnał, żeby nie patrzeć więcej przez okno.",
        "neutral": "Wyobraź sobie, że przeglądasz stare zdjęcia w albumie na poddaszu babci. Kurz unosi się w promieniach słońca wpadających przez okno, a na półkach stoją pudełka z porcelanowymi figurkami. Na jednym ze zdjęć widzisz siebie jako dziecko, trzymającego pluszowego misia w kapeluszu. Pachnie tu lawendą i starą drewnianą podłogą. Zastanawiasz się, czy zabrać któreś zdjęcie do ramki."
    }
};

// Losowa kolejność list
const listOrder = jsPsych.randomization.shuffle(["LEKARZ", "ŻYCZENIE", "WYSOKI", "GWIZDEK"]);
const groups = {
    "critical": ["critical", "critical", "critical", "critical"],
    "non_critical": ["non_critical", "non_critical", "non_critical", "non_critical"],
    "neutral": ["neutral", "neutral", "neutral", "neutral"]
};

// Lista 30 słów do fazy rozpoznawania
const fullRecognitionList = [
    "stetoskop", "kitel", "fartuch", "słuchawki", "pediatra",  // LEKARZ
    "urodziny", "rozkaz", "kartka", "spełnienie", "prośba",    // ŻYCZENIE
    "chłopak", "dąb", "poziom", "przystojny", "długi",         // WYSOKI
    "sędzia", "hałas", "koniec", "sport", "piłka",             // GWIZDEK
    "lekarz", "życzenie", "wysoki", "gwizdek",                 // Słowa krytyczne
    "apteka", "most", "balon", "telewizor", "księżyc",         // Dystraktory
    "piasek", "motyl", "laptop", "rower", "zegar"              // Dystraktory
];

// Losowe przemieszanie listy słów do rozpoznawania
const shuffledRecognitionList = jsPsych.randomization.shuffle(fullRecognitionList);

// Zadania matematyczne (bardziej złożone)
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
        <h2>Witamy w badaniu naukowym</h2>
        <p>Wszystkie dane są anonimowe i będą wykorzystywane wyłącznie do celów naukowych.</p>
        <p>Twoim zadaniem jest zapamiętanie jak najwięcej słów z każdej listy. Po każdej liście przeczytasz krótki tekst. Na koniec odbędzie się test rozpoznawania słów.</p>
        <p>Kliknij przycisk poniżej, aby kontynuować.</p>
        <p>(Naciśnij ESC, aby wyjść w dowolnym momencie)</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions' },
    on_finish: function(data) {
        console.log("Kliknięto przycisk:", data.response);
        console.log("Pełne dane:", data);
    }
};
timeline.push(instructions);

// Dane demograficzne
const demographics = {
    type: jsPsychSurveyText,
    questions: [
        { prompt: "Podaj swój wiek:", name: 'age', required: true, input_type: 'number' },
        { prompt: "Podaj swoją płeć (Kobieta, Mężczyzna, Inna, Wolę nie podawać):", name: 'gender', required: true }
    ],
    data: { participant_id: participantId, group: group, phase: 'demographics' }
};
timeline.push(demographics);

// Informacja o teście
const testInfo = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Zaraz zacznie się test</h2>
        <p>Przygotuj się do zapamiętywania słów z list.</p>
        <p>Kliknij przycisk, aby kontynuować.</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions' },
    on_finish: function(data) {
        console.log("Kliknięto przycisk w testInfo:", data.response);
    }
};
timeline.push(testInfo);

// Listy słów i narracje
for (let i = 0; i < listOrder.length; i++) {
    const listName = listOrder[i];
    const wordList = wordLists[listName];

    // Wyświetlenie listy słów
    for (const word of wordList) {
        const wordTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${word}</h1>`,
            choices: ['no_response'],
            trial_duration: 1000,
            response_ends_trial: false,
            post_trial_gap: 500,
            data: { participant_id: participantId, group: group, list_name: listName, trial_number: i + 1, word: word, phase: 'word_list' }
        };
        timeline.push(wordTrial);
    }

    // Narracja
    const narrationType = groups[group][i];
    const narrationText = narratives[listName][narrationType];
    const sentences = narrationText.split('.').map(s => s.trim()).filter(s => s);

    const narrationInstructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <p>Przeczytaj uważnie poniższe zdania. Twój czas będzie mierzony.</p>
            <p>Kliknij przycisk poniżej, aby kontynuować.</p>
            <p>(Naciśnij ESC, aby wyjść)</p>
        `,
        choices: ['Przejdź dalej'],
        data: { phase: 'instructions' },
        on_finish: function(data) {
            console.log("Kliknięto przycisk w narracji:", data.response);
        }
    };
    timeline.push(narrationInstructions);

    for (let j = 0; j < sentences.length; j++) {
        const sentenceTrial = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
                <p>Zdanie ${j + 1}:</p>
                <p>${sentences[j]}.</p>
                <p>Kliknij przycisk, aby przejść dalej.</p>
            `,
            choices: ['Przejdź dalej'],
            data: { 
                participant_id: participantId, 
                group: group, 
                list_name: listName, 
                trial_number: i + 1, 
                sentence_number: j + 1, 
                sentence: sentences[j], 
                phase: 'narration' 
            }
        };
        timeline.push(sentenceTrial);
    }

    // Przerwa między listami (oprócz ostatniej)
    if (i < listOrder.length - 1) {
        const breakTrial = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
                <p>Krótka przerwa...</p>
                <p>Przygotuj się na następną listę słów.</p>
                <p>Kliknij przycisk, aby kontynuować.</p>
                <p>(Naciśnij ESC, aby wyjść)</p>
            `,
            choices: ['Przejdź dalej'],
            data: { phase: 'instructions' },
            on_finish: function(data) {
                console.log("Kliknięto przycisk w przerwie:", data.response);
            }
        };
        timeline.push(breakTrial);
    }
}

// Zadania matematyczne
const mathIntro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <p>Teraz rozwiąż kilka prostych zadań matematycznych.</p>
        <p>Kliknij przycisk, aby kontynuować.</p>
        <p>(Naciśnij ESC, aby wyjść)</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions' },
    on_finish: function(data) {
        console.log("Kliknięto przycisk w mathIntro:", data.response);
    }
};
timeline.push(mathIntro);

for (let i = 0; i < mathTasks.length; i++) {
    const mathTrial = {
        type: jsPsychSurveyText,
        questions: [
            { prompt: `${mathTasks[i].question}`, name: `math_${i}`, required: true, input_type: 'number' }
        ],
        data: { 
            participant_id: participantId, 
            group: group, 
            math_question: mathTasks[i].question, 
            correct_answer: mathTasks[i].answer,
            phase: 'math'
        }
    };
    timeline.push(mathTrial);
}

// Faza rozpoznawania
const recognitionIntro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <p>Teraz zobaczysz listę słów. Twoim zadaniem jest określenie, czy dane słowo pojawiło się wcześniej na którejś z list.</p>
        <p>Jeśli słowo pojawiło się wcześniej, naciśnij "Tak". Jeśli nie, naciśnij "Nie".</p>
        <p>Po każdym wyborze ocenisz swoją pewność na skali od 1 (zupełnie niepewny) do 5 (całkowicie pewny).</p>
        <p>Kliknij przycisk, aby kontynuować.</p>
        <p>(Naciśnij ESC, aby wyjść)</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions' },
    on_finish: function(data) {
        console.log("Kliknięto przycisk w recognitionIntro:", data.response);
    }
};
timeline.push(recognitionIntro);

for (const word of shuffledRecognitionList) {
    const recognitionTrial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<h1>${word}</h1>`,
        choices: ['Tak', 'Nie'],
        prompt: '<p>Czy to słowo pojawiło się wcześniej?</p>',
        data: { 
            participant_id: participantId, 
            group: group, 
            word: word,
            is_target: wordLists[listOrder[0]].includes(word) || 
                      wordLists[listOrder[1]].includes(word) || 
                      wordLists[listOrder[2]].includes(word) || 
                      wordLists[listOrder[3]].includes(word) ||
                      ['lekarz', 'życzenie', 'wysoki', 'gwizdek'].includes(word),
            phase: 'recognition'
        },
        on_finish: function(data) {
            // Zapisujemy odpowiedź jako "Tak" lub "Nie"
            data.response_text = data.response === 0 ? 'Tak' : 'Nie';
        }
    };
    timeline.push(recognitionTrial);

    const confidenceTrial = {
        type: jsPsychSurveyLikert,
        questions: [
            { 
                prompt: `Jak bardzo jesteś pewien swojej odpowiedzi dla słowa "${word}"?`, 
                labels: ['1 (zupełnie niepewny)', '2', '3', '4', '5 (całkowicie pewny)'], 
                required: true, 
                name: `confidence_${word}` 
            }
        ],
        data: { 
            participant_id: participantId, 
            group: group, 
            word: word, 
            phase: 'confidence'
        },
        on_finish: function(data) {
            // Pobieramy dane z poprzedniego trialu (recognition)
            const recognitionData = jsPsych.data.get().last(1).values()[0];
            const responseText = recognitionData.response_text;
            const confidenceValue = data.response[`confidence_${word}`] + 1; // +1, bo skala w danych zaczyna się od 0
            // Tworzymy ciąg RecognitionData
            const recognitionDataString = `${word}, ${responseText}, ${confidenceValue}`;
            // Dodajemy RecognitionData do danych poprzedniego trialu
            jsPsych.data.get().last(1).addProperties({ RecognitionData: recognitionDataString });
        }
    };
    timeline.push(confidenceTrial);
}

// Zakończenie eksperymentu
const endMessage = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Dziękujemy za udział w badaniu!</h2>
        <p>Twoje dane zostały zapisane.</p>
        <p>Kliknij przycisk, aby zakończyć.</p>
    `,
    choices: ['Zakończ'],
    data: { phase: 'instructions' }
};
timeline.push(endMessage);

// Uruchomienie eksperymentu
jsPsych.run(timeline);
