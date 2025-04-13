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
    use_webaudio: false // Wyłączenie Web Audio, aby uniknąć błędu AudioContext
});

// Dane uczestnika
const participantId = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 15);

// Mechanizm sekwencyjnego przypisania grup
let groupCounter = localStorage.getItem('groupCounter') ? parseInt(localStorage.getItem('groupCounter')) : 0;
const groupNames = ["critical", "non_critical", "neutral"];
const group = groupNames[groupCounter % groupNames.length];
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
                experimentID: 'nIbjy3keQoaX',
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
    "SPRAGNIONY": ["pustynia", "potrzeba", "sprite", "napój", "oaza", "cytryna", "upadł", "picie", "pepsi", "głodny", "sportowiec", "bieganie", "woda", "cola", "kac"],
    "GWIZDEK": ["mecz", "w-f", "sędzia", "głośny", "hałas", "trener", "koniec", "dźwięk", "sport", "policjant", "gwizd", "czajnik", "świst", "sygnał", "piłka"]
};

// Narracje
const narratives = {
    "LEKARZ": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Mogłeś/aś wyobrazić sobie, że siedzisz w zatłoczonej poczekalni szpitala. Przez uchylone drzwi gabinetu widzisz pielęgniarkę, która pobiera krew nastolatkowi. W pomieszczeniu obok mężczyzna ubrany na biało słucha staruszki opisującej kaszel. Przez korytarz przechodzi pacjent z receptą w dłoni, którą wypisał mu ktoś przed chwilą. Czekasz, aż ktoś udzieli ci pomocy, a chłodne powietrze i stukot klawiatur sprawiają, że chcesz jak najszybciej iść do domu.",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Mogłeś/aś wyobrazić sobie, że siedzisz w zatłoczonej poczekalni szpitala. Przez uchylone drzwi gabinetu widzisz pielęgniarkę, która pobiera krew nastolatkowi. Niedaleko ciebie widzisz staruszkę, która ma kaszel. Przez korytarz przechodzi pacjent z czymś w ręku. To pewnie recepta, na leki, których koniecznie potrzebuje. Czekasz na pomoc, a chłodne powietrze i stukot klawiatur sprawiają, że chcesz jak najszybciej iść do domu.",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Teraz jednak w ramach przerwy wyobraź sobie, że siedzisz w cichej czytelni biblioteki. Przez półotwarte drzwi widzisz osobę układającą książki na półce. Obok Ciebie studentka przewraca strony notesu, szukając ważnego cytatu. Na środku stolik z gazetami, a przez wprowadź okno wpada ciepłe światło poranka. Czekasz na otwarcie archiwum, a szelest papieru i zapach kawy sprawiają, że czujesz się wspaniale."
    },
    "WYSOKI": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Mogłeś/aś wyobrazić sobie, że przechodzisz przez park w centrum miasta. Obok ciebie mężczyzna w koszulce sportowej przygotowuje się do gry. Wielki koszykarz rozgrzewa się przed meczem, opierając dłonie o słup, który sięga ponad korony drzew. Niedaleko parku stoją ogromne wieżowce o szklanych fasadach, rzucające cień na całą okolicę. Zastanawiasz się, jak ludzie wznoszą takie budynki, które wydają się dotykać nieba.",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Mogłeś/aś wyobrazić sobie, że przechodzisz przez park w centrum miasta. Obok ciebie mężczyzna w koszulce sportowej przygotowuje się do gry. Koszykarz rozgrzewa się przed meczem, opierając dłonie o słup, który stoi przy boisku. Niedaleko parku stoją wieżowce o szklanych fasadach, które odbijają promienie słoneczne w twoją stronę. Jesteś zachwycony/a ich wykonaniem i zastanawiasz się, jak ludzie wznoszą takie budynki.",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Teraz jednak w ramach przerwy wyobraź sobie, że siedzisz w kawiarni na starym rynku. Przez okno obserwujesz turystów fotografujących fontannę z posągiem Neptuna. Kelnerka w koszulce w kratkę nalewa Ci herbatę do filiżanki z motywem kotów. Zapach świeżo mielonej kawy miesza się z dźwiękiem delikatnego jazzu, a Ty zastanawiasz się, czy wybrać sernik czy makowiec. Mówisz, że potrzebujesz jeszcze chwili, żeby wybrać."
    },
    "SPRAGNIONY": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Mogłeś/aś wyobrazić sobie, że siedzisz w dusznym barze po całym dniu bez picia. Kelner podaje Ci colę z lodem i plasterkiem cytryny, a Ty od razu chwytasz szklankę. Twój głodny żołądek burczy, ale najpilniejsza jest potrzeba nawodnienia. Pijesz ją duszkiem i łagodzisz ją natychmiast. Czujesz, że ciepło już ci tak bardzo nie przeszkadza i że nie masz już suchości w gardle.",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Mogłeś/aś wyobrazić sobie, że siedzisz w barze w letni wieczór. Jesteś głodny, ale stać Cię na jedną rzecz. Kelner podaje Ci colę z lodem i plasterkiem cytryny, a Ty spokojnie delektujesz się piciem. Smakuje dobrze jak zawsze i myślisz, że dobrze wydałeś pieniądze. Czujesz się już dużo lepiej i nie czujesz potrzeby zostać dłużej, więc niedługo później wracasz do domu.",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Teraz jednak w ramach przerwy wyobraź sobie, że stoisz na przystanku tramwajowym w deszczowy poranek. Obok Ciebie kobieta w przezroczystym parasolu czyta e-booka, a nastolatek w słuchawkach podryguje w rytm muzyki. Przy przystanku jest twoja ulubiona restauracja, a ty widzisz jak kelner serwuje główne danie. Odwracasz wzrok i widzisz, jak szynach kołysze się opuszczona reklamówka, a z głośnika słychać komunikat o opóźnieniu. Zapach mokrego asfaltu i stęchłej gazety miesza się z Twoim zniecierpliwieniem. Myślisz, że dziś lepiej było wziąć tę drugą parę butów."
    },
    "GWIZDEK": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Mogłeś/aś wyobrazić sobie, że jesteś na sali gimnastycznej podczas w-f. Młody trener krzyczy, byście ustawili się w rzędzie. Słyszysz wyraźny hałas z zewnątrz i przestajesz skupiać się na lekcji. Za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym, wydając wysokie dźwięki. Zapatrzony w okno nagle słyszysz niechciany, głośny sygnał i wiesz, że musisz zacząć biegać okrążenia na hali.",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Mogłeś/aś wyobrazić sobie, że jesteś na sali gimnastycznej podczas w-f. Młody trener krzyczy, byście ustawili się w rzędzie. Ty jednak nie skupiasz się na lekcji, bo za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym. Zapatrzony w okno słyszysz dźwięk głosu trenera, który mówi, że musisz się skupić. To twój sygnał, żeby zacząć biegać okrążenia na hali.",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien mentalny obraz. Teraz jednak w ramach przerwy wyobraź sobie, że przeglądasz stare zdjęcia w albumie na poddaszu babci. Kurz unosi się w promieniach słońca wpadających przez okno, a na półkach stoją pudełka z porcelanowymi figurkami. Na jednym ze zdjęć widzisz siebie jako młode dziecko, trzymające pluszowego misia w kapeluszu. Pachnie tu lawendą i starą drewnianą podłogą. Zastanawiasz się, czy zabrać któreś zdjęcie do ramki."
    }
};

// Losowa kolejność list
const listOrder = jsPsych.randomization.shuffle(["LEKARZ", "WYSOKI", "SPRAGNIONY", "GWIZDEK"]);
const groups = {
    "critical": ["critical", "critical", "critical", "critical"],
    "non_critical": ["non_critical", "non_critical", "non_critical", "non_critical"],
    "neutral": ["neutral", "neutral", "neutral", "neutral"]
};

// Lista słów w ustalonej kolejności dla ConfidenceFinalSummary
const criticalWords = ["lekarz", "wysoki", "spragniony", "gwizdek"];
const commonWords = ["drzwi", "koszulka", "kelner", "młody"];
const listWords = [
    "stetoskop", "kitel", "słuchawki", "pediatra",          // LEKARZ
    "chłopak", "dąb", "przystojny", "długi",                // WYSOKI
    "sprite", "oaza", "pepsi", "woda",                      // SPRAGNIONY
    "sędzia", "hałas", "sport", "piłka"                     // GWIZDEK
];
const controlWords = ["farby", "miska", "pies", "telefon", "makaron", "korona", "dżungla", "medal"];
const fixedOrderWords = [...criticalWords, ...commonWords, ...listWords, ...controlWords];

// Losowa kolejność słów w fazie rozpoznawania
const shuffledRecognitionList = jsPsych.randomization.shuffle(fixedOrderWords);

// Zadania matematyczne
const mathTasks = [
    { question: "2 + 2 × 3 =", answer: 8 },
    { question: "4 × 5 - 3 =", answer: 17 },
    { question: "3 + 4 × 2 =", answer: 11 },
    { question: "5 × 6 - 4 =", answer: 26 },
    { question: "8 ÷ 2 + 3 =", answer: 7 }
];

// Timeline eksperymentu
const timeline = [];

// Ekran początkowy
const welcomeScreen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Badanie pamięci online</h2>
        <p>To badanie zajmie około 20 minut. Prosimy wykonać je w skupieniu, w cichym pomieszczeniu, aby uniknąć rozproszenia.</p>
        <p>Prosimy przechodzić przez zadania i teksty płynnie, bez zatrzymywania się. Twój czas będzie mierzony.</p>
        <p>Jeśli naciśniesz ESC, Twoje dane nie będą brane pod uwagę. Dane nie będą również uwzględniane, jeśli wykryjemy, że nie czytasz tekstów.</p>
        <p>Badanie wymaga użycia ekranu komputera lub laptopa. Jeśli nie możesz teraz użyć takiego urządzenia, naciśnij ESC i wróć później.</p>
        <p>Jeśli jesteś gotowy/a, kliknij przycisk poniżej, aby kontynuować.</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'welcome', participant_id: participantId, group: group }
};
timeline.push(welcomeScreen);

// Instrukcje początkowe
const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Witamy w badaniu pamięci</h2>
        <p>W tym badaniu wyświetlone zostaną listy słów. Każde słowo będzie pokazywane pojedynczo przez krótki czas, z przerwą między słowami.</p>
        <p>Twoim zadaniem jest zapamiętanie jak największej liczby słów z każdej listy. Po każdej liście przeczytasz krótki tekst. Na koniec weźmiesz udział w teście rozpoznawania słów.</p>
        <p>Wszystkie dane są anonimowe i będą wykorzystywane wyłącznie do celów naukowych.</p>
        <p>Kliknij przycisk poniżej, aby kontynuować.</p>
        <p>(Naciśnij ESC, aby wyjść w dowolnym momencie)</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions', participant_id: participantId, group: group }
};
timeline.push(instructions);

// Dane demograficzne
const demographics = {
    type: jsPsychSurveyText,
    questions: [
        { prompt: "Podaj swój wiek:", name: 'age', required: true, input_type: 'number' },
        { prompt: "Podaj swoją płeć (Kobieta, Mężczyzna, Inna, Wolę nie podawać):", name: 'gender', required: true }
    ],
    data: { phase: 'demographics', participant_id: participantId, group: group }
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
    data: { phase: 'instructions', participant_id: participantId, group: group }
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

    // Narracja
    const narrationType = groups[group][i];
    const narrationText = narratives[listName][narrationType];
    const sentences = narrationText.split('.').map(s => s.trim()).filter(s => s);

    const narrationInstructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <p>Przeczytaj poniższe zdania i kliknij „Dalej”, gdy tylko będziesz gotowy/a.</p>
            <p>(Naciśnij ESC, aby wyjść)</p>
        `,
        choices: ['Przejdź dalej'],
        data: { phase: 'instructions', participant_id: participantId, group: group }
    };
    timeline.push(narrationInstructions);

    let fastSentences = []; // Lista na zdania z rt < 400 ms

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
            },
            on_finish: function(data) {
                if (data.rt < 400) {
                    fastSentences.push(data.sentence);
                }
                const lastThree = jsPsych.data.get().filter({phase: 'narration'}).last(3).values();
                if (data.rt < 300 && lastThree.length >= 3 && lastThree.every(trial => trial.rt < 300)) {
                    alert("Prosimy czytać zdania uważnie!");
                }
            }
        };
        timeline.push(sentenceTrial);
    }

    const narrationSummary = {
        type: jsPsychHtmlButtonResponse,
        stimulus: 'Kończymy narrację. Kliknij "Dalej", aby kontynuować.',
        choices: ['Dalej'],
        data: { phase: 'narration_summary', participant_id: participantId, group: group },
        on_finish: function() {
            const hasFastSentences = fastSentences.length > 0;
            const fastSentencesList = hasFastSentences ? fastSentences.join('; ') : '';
            jsPsych.data.addDataToLastTrial({
                has_fast_sentences: hasFastSentences,
                fast_sentences_list: fastSentencesList
            });
        }
    };
    timeline.push(narrationSummary);

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
            data: { phase: 'instructions', participant_id: participantId, group: group }
        };
        timeline.push(breakTrial);
    }
}

// Zadania matematyczne
const mathIntro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <p>Teraz rozwiąż kilka prostych zadań matematycznych.</p>
        <p>Wpisz odpowiedź liczbową w polu tekstowym. Upewnij się, że uwzględniasz kolejność działań (mnożenie i dzielenie przed dodawaniem i odejmowaniem).</p>
        <p>Kliknij przycisk, aby kontynuować.</p>
        <p>(Naciśnij ESC, aby wyjść)</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions', participant_id: participantId, group: group }
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
let recognitionData = {}; // Obiekt do przechowywania danych rozpoznawania

const recognitionIntro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <p>Teraz zobaczysz pojedyncze słowa. Twoim zadaniem jest określenie, czy dane słowo pojawiło się wcześniej na którejś z list słów (nie w tekstach).</p>
        <p>Jeśli słowo było na liście, naciśnij „Tak”. Jeśli nie, naciśnij „Nie”.</p>
        <p>Po każdym wyborze ocenisz swoją pewność na skali od 1 (zupełnie niepewny/a) do 5 (całkowicie pewny/a).</p>
        <p>Kliknij przycisk, aby kontynuować.</p>
        <p>(Naciśnij ESC, aby wyjść)</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions', participant_id: participantId, group: group }
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
                      wordLists[listOrder[3]].includes(word),
            phase: 'recognition'
        },
        on_finish: function(data) {
            recognitionData[word] = {
                Stimulus: word,
                Response: data.response === 0 ? "Tak" : "Nie",
                ConfidenceResponse: null // Początkowo null, zaktualizowane w confidenceTrial
            };
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
            const confidenceValue = data.response[`confidence_${word}`] + 1; // Skala 0-4 przesunięta na 1-5
            data.confidence_response = confidenceValue;
            recognitionData[word].ConfidenceResponse = confidenceValue;
            data.recognition_summary = recognitionData[word]; // Poprawnie zapisane recognition_summary
        }
    };
    timeline.push(confidenceTrial);
}

// Dodanie ConfidenceFinalSummary w ustalonej kolejności jako osobne wiersze
for (const word of fixedOrderWords) {
    const summaryTrial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: '', // Pusty tekst, aby nic nie wyświetlać
        choices: [], // Brak przycisków, automatyczne przejście
        trial_duration: 0, // Natychmiastowe przejście
        response_ends_trial: false,
        data: {
            phase: 'summary',
            participant_id: participantId,
            group: group,
            stimulus: word,
            Response: recognitionData[word]?.Response || 'Brak odpowiedzi',
            ConfidenceResponse: recognitionData[word]?.ConfidenceResponse || 'Brak odpowiedzi'
        }
    };
    timeline.push(summaryTrial);
}

// Zakończenie eksperymentu
const endMessage = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Dziękujemy za udział w badaniu!</h2>
        <p>Twój udział w teście rozpoznawania słów z list został zakończony. Twoje dane zostały zapisane.</p>
        <p>Kliknij przycisk, aby zakończyć badanie.</p>
    `,
    choices: ['Zakończ'],
    data: { phase: 'instructions', participant_id: participantId, group: group }
};
timeline.push(endMessage);

// Uruchomienie eksperymentu
jsPsych.run(timeline);
