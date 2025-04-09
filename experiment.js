// Funkcja do zapisu danych na OSF
async function saveDataToOSF(data, filename) {
    console.log("Próba zapisu danych:", data);
    try {
        const response = await fetch('https://pipe.jspsych.org/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                experimentID: 'nIbjy3keQoaX',
                filename: filename,
                data: data
            })
        });
        console.log("Odpowiedź z DataPipe:", response);
        if (!response.ok) {
            throw new Error('Błąd zapisu danych na OSF: ' + response.statusText);
        }
        const result = await response.json();
        console.log("Wynik zapisu:", result);
        return result;
    } catch (error) {
        console.error('Wystąpił błąd podczas zapisywania danych:', error);
        alert('Wystąpił problem z zapisem danych. Skontaktuj się z badaczem.');
    }
}

// Inicjalizacja jsPsych
const participantId = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 15);
const group = 'critical'; // Możesz zmienić na 'neutral' w zależności od grupy

const jsPsych = initJsPsych({
    on_finish: function() {
        const data = jsPsych.data.get();
        const dataArray = data.values();
        if (dataArray.length > 0) {
            // Dane z narracji (sentence trials)
            const narrationData = data.filter({ phase: 'narration' }).csv();
            if (narrationData.split('\n').length > 1) {
                saveDataToOSF(narrationData, `results_${group}_${participantId}_narration.csv`);
            }

            // Dane z fazy rozpoznawania (recognition trials)
            const recognitionData = data.filter({ phase: 'recognition' }).csv();
            if (recognitionData.split('\n').length > 1) {
                saveDataToOSF(recognitionData, `results_${group}_${participantId}_recognition.csv`);
            }

            // Dane z fazy pewności (confidence trials)
            const confidenceData = data.filter({ phase: 'confidence' }).csv();
            if (confidenceData.split('\n').length > 1) {
                saveDataToOSF(confidenceData, `results_${group}_${participantId}_confidence.csv`);
            }
        } else {
            console.log("Brak danych do zapisania (brak rekordów).");
        }
    },
    use_webaudio: false
});

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

// Metryczka
const demographics = {
    type: jsPsychSurveyText,
    questions: [
        { 
            prompt: 'Wiek (w latach):', 
            name: 'age', 
            required: true, 
            input_type: 'number',
            validate: function(value) {
                if (isNaN(value) || value < 0 || value > 120) {
                    return 'Proszę wpisać poprawny wiek (0-120 lat).';
                }
                return true;
            }
        },
        { 
            prompt: 'Płeć (K, M, I):', 
            name: 'gender', 
            required: true, 
            validate: function(value) {
                if (!['K', 'M', 'I'].includes(value.toUpperCase()) || value.length !== 1) {
                    return 'Proszę wpisać K, M lub I.';
                }
                return true;
            }
        }
    ],
    data: { 
        participant_id: participantId, 
        group: group,
        phase: 'demographics'
    },
    button_label: 'Przejdź dalej' // Wymaga kliknięcia przycisku
};

// Listy słów
const wordLists = [
    ['choroba', 'pielęgniarka', 'stetoskop', 'doktor', 'kitel', 'pomoc', 'fartuch', 'szpital', 'słuchawki', 'recepta', 'specjalista', 'zdrowie', 'pediatra', 'pacjent', 'lek'], // LEKARZ
    ['marzenie', 'prezent', 'urodziny', 'ostatnie', 'rozkaz', 'święta', 'kartka', 'magia', 'spełnienie', 'wróżba', 'rybka', 'nadzieja', 'prośba', 'gwiazdka', 'pragnienie'], // ŻYCZENIE
    ['niski', 'mężczyzna', 'chłopak', 'brunet', 'dąb', 'koszykarz', 'poziom', 'słup', 'przystojny', 'budynek', 'siatkarz', 'szczupły', 'długi', 'wieżowiec', 'drabina'], // WYSOKI
    ['mecz', 'w-f', 'sędzia', 'głośny', 'hałas', 'trener', 'koniec', 'dźwięk', 'sport', 'policjant', 'gwizd', 'czajnik', 'świst', 'sygnał', 'piłka'] // GWIZDEK
];

// Narracje
const narratives = [
    [
        'Wyobraź sobie, że siedzisz w zatłoczonej poczekalni szpitala.',
        'Przez uchylone drzwi gabinetu widzisz pielęgniarkę, która pobiera krew nastolatkowi.',
        'W pomieszczeniu obok ktoś ubrany na biało słucha staruszki opisującej kaszel.',
        'Przez korytarz przechodzi pacjent z receptą w dłoni, którą wypisał mu ktoś przed chwilą.',
        'Czekasz na pomoc, a chłodne powietrze i stukot klawiatur sprawiają, że chcesz jak najszybciej iść do domu.'
    ],
    [
        'Wyobraź sobie, że siedzisz przy stole wigilijnym.',
        'Na choince migocze gwiazdka, a pod nią leży prezent owinięty w złoty papier.',
        'Babcia cieszy się z magii świąt i z tego, że wszyscy przyjechali do niej.',
        'Podchodzicie do siebie i mówicie sobie miłe słowa na nowy rok.',
        'W kącie stoi talerz z ciasteczkami z wróżbą, które mają zdecydować o Twojej przyszłości, chociaż sam w to nie wierzysz.',
        'Wolisz dzielić się opłatkiem i mówić, czego pragniesz dla bliskich.'
    ],
    [
        'Wyobraź sobie, że przechodzisz przez park w centrum miasta.',
        'Obok ciebie mężczyzna w koszulce sportowej przygotowuje się do gry.',
        'Wielki koszykarz rozciąga się przed meczem, opierając dłonie o słup, który sięga ponad korony drzew.',
        'Dookoła parku stoją ogromne wieżowce o szklanych fasadach, rzucające cień na całą okolicę.',
        'Zastanawiasz się, jak ludzie wznoszą takie budynki, które wydają się dotykać nieba.'
    ],
    [
        'Wyobraź sobie, że jesteś na sali gimnastycznej podczas w-f.',
        'Trener krzyczy, byście ustawili się w rzędzie.',
        'Słyszysz wysoki dźwięk na zewnątrz i nie skupiasz się na lekcji.',
        'Za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym, wydając ostre dźwięki.',
        'Zapatrzony w okno słyszysz niechciany sygnał, i wiesz, że musisz zacząć biegać okrążenia.'
    ]
];

// Losowa kolejność list
const listOrder = jsPsych.randomization.shuffle([0, 1, 2, 3]);
const listNames = ['LEKARZ', 'ŻYCZENIE', 'WYSOKI', 'GWIZDEK'];

// Tworzenie timeline dla list słów i narracji
const timeline = [instructions, demographics];

for (let i = 0; i < listOrder.length; i++) {
    const listIndex = listOrder[i];
    const listName = listNames[listIndex];
    const words = wordLists[listIndex];
    const sentences = narratives[listIndex];

    // Wyświetlanie słów
    for (let j = 0; j < words.length; j++) {
        const word = words[j];
        const wordTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${word}</h1>`,
            choices: ['no_response'],
            trial_duration: 1000,
            response_ends_trial: false,
            post_trial_gap: 500,
            data: { 
                participant_id: participantId, 
                group: group, 
                list_name: listName, 
                trial_number: i + 1, 
                word: word,
                phase: 'word_list'
            }
        };
        timeline.push(wordTrial);
    }

    // Instrukcja przed narracją
    const narrationInstructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <p>Przeczytaj uważnie poniższe zdania. Twój czas będzie mierzony.</p>
            <p>Kliknij przycisk poniżej, aby kontynuować.</p>
            <p>(Naciśnij ESC, aby wyjść)</p>
        `,
        choices: ['Przejdź dalej'],
        data: { phase: 'instructions' }
    };
    timeline.push(narrationInstructions);

    // Wyświetlanie narracji
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
            data: { phase: 'instructions' }
        };
        timeline.push(breakTrial);
    }
}

// Zadania matematyczne
const mathInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <p>Teraz rozwiąż kilka prostych zadań matematycznych.</p>
        <p>Kliknij przycisk, aby kontynuować.</p>
        <p>(Naciśnij ESC, aby wyjść)</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions' }
};
timeline.push(mathInstructions);

// Prostsza wersja zadań matematycznych (bez komunikatów i powtórek)
const mathTasks = [
    { question: '2 + 3 × 4 =', answer: '14' },
    { question: '5 × 2 + 1 =', answer: '11' },
    { question: '3 + 4 × 2 =', answer: '11' },
    { question: '1 × 3 + 5 =', answer: '8' },
    { question: '4 + 2 × 3 =', answer: '10' }
];

const mathTrials = [];
for (let i = 0; i < mathTasks.length; i++) {
    const mathTrial = {
        type: jsPsychSurveyText,
        questions: [
            { 
                prompt: `${mathTasks[i].question}`, 
                name: `math_${i}`, 
                required: true, 
                input_type: 'number',
                validate: function(value) {
                    if (isNaN(value) || value === '') {
                        return 'Proszę wpisać liczbę.';
                    }
                    return true;
                }
            }
        ],
        data: { 
            participant_id: participantId, 
            group: group, 
            math_question: mathTasks[i].question, 
            correct_answer: mathTasks[i].answer,
            phase: 'math'
        },
        button_label: 'Przejdź dalej' // Wymaga kliknięcia przycisku
    };
    mathTrials.push(mathTrial);
}
timeline.push(...mathTrials);

// Zapis pośredni po zadaniach matematycznych
const saveMathData = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p>Zapisuję dane...</p>',
    choices: ['no_response'],
    trial_duration: 1000,
    response_ends_trial: false,
    on_finish: function() {
        const data = jsPsych.data.get();
        const narrationData = data.filter({ phase: 'narration' }).csv();
        if (narrationData.split('\n').length > 1) {
            saveDataToOSF(narrationData, `results_${group}_${participantId}_narration.csv`);
        }
    }
};
timeline.push(saveMathData);

// Faza rozpoznawania
const recognitionInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <p>Teraz zobaczysz listę słów. Twoim zadaniem jest określenie, czy dane słowo pojawiło się wcześniej na którejś z list.</p>
        <p>Jeśli słowo pojawiło się wcześniej, naciśnij "Tak". Jeśli nie, naciśnij "Nie".</p>
        <p>Po każdym wyborze ocenisz swoją pewność na skali od 1 (zupełnie niepewny) do 5 (całkowicie pewny).</p>
        <p>Kliknij przycisk, aby kontynuować.</p>
        <p>(Naciśnij ESC, aby wyjść)</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions' }
};
timeline.push(recognitionInstructions);

// Lista słów do fazy rozpoznawania z indeksami
const recognitionWords = [
    'wysoki', 'koniec', 'most', 'lekarz', 'laptop', 'zegar', 'słuchawki', 'prośba', 'telewizor', 'hałas',
    'apteka', 'przystojny', 'poziom', 'pediatra', 'kartka', 'balon', 'sport', 'stetoskop', 'kitel', 'fartuch',
    'piłka', 'rower', 'motyl', 'księżyc', 'spełnienie', 'gwizdek', 'piasek', 'dąb', 'długi', 'urodziny',
    'życzenie', 'sędzia', 'chłopak', 'rozkaz'
];

// Losowa kolejność słów w fazie rozpoznawania
const shuffledRecognitionWords = jsPsych.randomization.shuffle(recognitionWords);

// Tworzenie mapy indeksów (oryginalna kolejność słów)
const wordIndexMap = {};
recognitionWords.forEach((word, index) => {
    wordIndexMap[word] = index;
});

// Triale rozpoznawania
const recognitionTrials = [];
for (let k = 0; k < shuffledRecognitionWords.length; k++) {
    const word = shuffledRecognitionWords[k];
    const recognitionTrial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<h1>${word}</h1>`,
        choices: ['Tak', 'Nie'],
        prompt: '<p>Czy to słowo pojawiło się wcześniej?</p>',
        data: { 
            participant_id: participantId, 
            group: group, 
            word: word,
            word_order: wordIndexMap[word],
            is_target: wordLists[listOrder[0]].includes(word) || 
                      wordLists[listOrder[1]].includes(word) || 
                      wordLists[listOrder[2]].includes(word) || 
                      wordLists[listOrder[3]].includes(word) ||
                      ['lekarz', 'życzenie', 'wysoki', 'gwizdek'].includes(word),
            phase: 'recognition'
        }
    };
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
            word_order: wordIndexMap[word],
            phase: 'confidence'
        },
        button_label: 'Przejdź dalej' // Wymaga kliknięcia przycisku
    };
    recognitionTrials.push(recognitionTrial, confidenceTrial);
}
timeline.push(...recognitionTrials);

// Zakończenie
const endScreen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Dziękujemy za udział w badaniu!</h2>
        <p>Twoje dane zostały zapisane.</p>
        <p>Kliknij przycisk, aby zakończyć.</p>
    `,
    choices: ['Zakończ'],
    data: { phase: 'instructions' }
};
timeline.push(endScreen);

// Uruchomienie eksperymentu
jsPsych.run(timeline);
