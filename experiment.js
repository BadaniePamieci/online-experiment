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
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Mogłeś/aś wyobrazić sobie, że siedzisz w zatłoczonej poczekalni szpitala. Przez uchylone drzwi gabinetu widzisz pielęgniarkę, która pobiera krew nastolatkowi. W pomieszczeniu obok mężczyzna ubrany na biało słucha staruszki, która kaszle. Przez korytarz przechodzi pacjent z receptą w dłoni, którą ktoś mu przed chwilą wypisał. Czekasz, aż ktoś udzieli Ci pomocy, a chłodne powietrze i stukot klawiatur sprawiają, że chcesz jak najszybciej iść do domu.",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Mogłeś/aś wyobrazić sobie, że siedzisz w zatłoczonej poczekalni szpitala. Przez uchylone drzwi gabinetu widzisz pielęgniarkę, która pobiera krew nastolatkowi. Niedaleko ciebie widzisz staruszkę, która ma kaszel. Przez korytarz przechodzi pacjent z receptą w dłoni. Czekasz na pomoc, a chłodne powietrze i stukot klawiatur sprawiają, że chcesz jak najszybciej iść do domu.",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Teraz w ramach przerwy wyobraź sobie, że siedzisz w cichej czytelni biblioteki. Przez półotwarte drzwi widzisz osobę układającą książki na półce. Obok Ciebie studentka przewraca strony notesu, szukając ważnego zdania. Na środku stoi stolik z gazetami, a przez okno wpada ciepłe światło poranka. Czekasz na otwarcie archiwum, a szelest papieru i zapach kawy sprawiają, że czujesz się wspaniale."
    },
    "WYSOKI": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Mogłeś/aś wyobrazić sobie, że przechodzisz przez park w centrum miasta. Obok Ciebie mężczyzna w koszulce sportowej przygotowuje się do gry. Wielki koszykarz rozgrzewa się przed meczem, opierając dłonie o słup, który sięga ponad korony drzew. Niedaleko parku stoją ogromne wieżowce o szklanych fasadach, rzucające cień na całą okolicę. Zastanawiasz się, jak ludzie wznoszą takie budynki, które wydają się dotykać nieba.",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Mogłeś/aś wyobrazić sobie, że przechodzisz przez park w centrum miasta. Obok Ciebie mężczyzna w koszulce sportowej przygotowuje się do gry. Koszykarz rozgrzewa się przed meczem, opierając dłonie o słup, który stoi przy boisku. Niedaleko parku stoją wieżowce o szklanych fasadach, które odbijają promienie słoneczne w twoją stronę. Jesteś zachwycony/a ich wykonaniem i zastanawiasz się, jak ludzie wznoszą takie budynki.",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Teraz w ramach przerwy wyobraź sobie, że siedzisz w kawiarni na starym rynku. Przez okno obserwujesz turystów fotografujących fontannę z posągiem Neptuna. Kelnerka w koszulce w kratkę nalewa Ci herbatę do filiżanki z motywem kotów. Zapach świeżo mielonej kawy miesza się z dźwiękiem delikatnego jazzu, a Ty zastanawiasz się, czy wybrać sernik czy makowiec. Mówisz, że potrzebujesz jeszcze chwili, żeby wybrać."
    },
    "SPRAGNIONY": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Mogłeś/aś wyobrazić sobie, że siedzisz w dusznym barze po całym dniu bez picia. Kelner podaje Ci colę z lodem i plasterkiem cytryny, a Ty od razu chwytasz szklankę. Twój głodny żołądek burczy, ale najpilniejsza jest potrzeba nawodnienia. Pijesz ją duszkiem i łagodzisz ją natychmiast. Zauważasz, że ciepło już Ci tak bardzo nie przeszkadza i czujesz jak ustępuje suchość w gardle.",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Mogłeś/aś wyobrazić sobie, że siedzisz w barze w letni wieczór. Jesteś głodny, ale stać Cię na jedną rzecz. Kelner podaje Ci colę z lodem i plasterkiem cytryny, a Ty spokojnie delektujesz się piciem. Smakuje dobrze jak zawsze i myślisz, że dobrze wydałeś pieniądze. Czujesz się już dużo lepiej i nie czujesz potrzeby zostać dłużej, więc chwilę później wracasz do domu.",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Teraz jednak w ramach przerwy wyobraź sobie, że stoisz na przystanku tramwajowym w deszczowy poranek. Obok Ciebie kobieta w przezroczystym parasolu czyta w skupieniu e-booka. Przy przystanku jest twoja ulubiona restauracja, a Ty widzisz jak kelner serwuje główne danie. Odwracasz wzrok i widzisz, jak szynach kołysze się opuszczona reklamówka, a z głośnika słychać komunikat o opóźnieniu. Myślisz, że dziś lepiej było wziąć tę drugą parę butów, bo zaczyna bardziej padać."
    },
    "GWIZDEK": {
        "critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Mogłeś/aś wyobrazić sobie, że jesteś na sali gimnastycznej podczas w-f. Młody trener krzyczy, byście ustawili się w rzędzie. Słyszysz wyraźny hałas z zewnątrz i przestajesz skupiać się na lekcji. Za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym, wydając wysokie dźwięki. Zapatrzony w okno nagle słyszysz niechciany, głośny sygnał i wiesz, że musisz znowu zacząć biegać na hali.",
        "non_critical": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś/aś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Mogłeś/aś wyobrazić sobie, że jesteś na sali gimnastycznej podczas w-f. Młody trener krzyczy, byście ustawili się w rzędzie. Ty jednak nie skupiasz się na lekcji, bo za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym. Zapatrzony w okno słyszysz dźwięk głosu trenera, który mówi że musisz się skupić. To twój sygnał, żeby znowu zacząć biegać na hali.",
        "neutral": "Miałeś/aś przed chwilą za zadanie zapamiętać słowa z listy. Pewnie zauważyłeś, że słowa te związane są ze sobą i mogą tworzyć pewien spójny obraz. Teraz jednak w ramach przerwy wyobraź sobie, że przeglądasz stare zdjęcia w albumie na poddaszu babci. Kurz unosi się w promieniach słońca wpadających przez okno, a na półkach stoją pudełka z porcelanowymi figurkami. Na jednym ze zdjęć widzisz bardzo młodego Siebie, trzymającego pluszowego misia w kapeluszu. Pachnie tu lawendą i starą drewnianą podłogą. Zastanawiasz się, czy zabrać któreś zdjęcie do Twojego pokoju."
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

// Zmienne do śledzenia czasu i danych
let firstWordTime = null;
let lastRecognitionTime = null;

// Ekran początkowy
const welcomeScreen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Dzień dobry!</h2>
        <p>To badanie wymaga użycia ekranu komputera lub laptopa. Jeśli nie możesz teraz użyć takiego urządzenia, naciśnij ESC i wróć później.</p>
        <p>Badanie zajmie około 10 minut. Proszę wykonaj je w skupieniu w cichym pomieszczeniu, aby uniknąć rozproszenia.</p>
        <p>Zadbaj o wyciszenie powiadomień, tak żeby w trakcie badania pojawiała się tylko jego treść.</p>
        <p>Jeśli naciśniesz ESC, Twoje dane nie będą brane pod uwagę.</p>
        <p>Jeśli jesteś gotowy/a, kliknij przycisk poniżej, aby kontynuować i przejść do instrukcji.</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'welcome', participant_id: participantId, group: group }
};
timeline.push(welcomeScreen);

// Instrukcje początkowe
const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Witam w badaniu pamięci!</h2>
        <p>Za chwilę zostaną wyświetlone listy słów. Każde słowo z listy będzie wyświetlane pojedynczo, przez krótki czas z przerwą między słowami.</p>
        <p>Twoim zadaniem jest zapamiętanie jak największej liczby słów z każdej listy. Wymaga to pełnego skupienia. Po każdej wyświetlonej liście przeczytasz krótki tekst.</p>
        <p>Konieczne jest przechodzenie przez zadania i teksty płynnie, bez zatrzymywania się. Twój czas będzie mierzony.</p>
        <p>Dane nie będą uwzględniane, jeśli wykryte zostanie, że nie czytasz tekstów. Na koniec weźmiesz udział w teście pamięci.</p>
        <p>Cała procedura jest anonimowa, a wyniki będą wykorzystywane wyłącznie do celów naukowych.</p>
        <p>W dowolnym momencie badania możesz zrezygnować z udziału w nim (naciskając ESC), a Twoje wyniki nie będą brane pod uwagę w analizie.</p>
        <p>Rozpoczęcie procedury jest jednoznaczne z wyrażeniem zgody na udział w badaniu.</p>
        <p>Kliknij przycisk poniżej, aby podać swój wiek i płeć.</p>
    `,
    choices: ['Przejdź dalej'],
    data: { phase: 'instructions', participant_id: participantId, group: group }
};
timeline.push(instructions);

// Dane demograficzne
let participantAge = null;
let participantGender = null;

const ageTrial = {
    type: jsPsychSurveyText,
    questions: [
        { prompt: "Podaj swój wiek:(liczbę lat)", name: 'age', required: true, input_type: 'number' }
    ],
    data: { phase: 'demographics', participant_id: participantId, group: group },
    on_finish: function(data) {
        participantAge = data.response.age;
    }
};
timeline.push(ageTrial);

const genderTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <p>Wybierz swoją płeć:</p>
    `,
    choices: ['Kobieta', 'Mężczyzna', 'Inna'],
    data: { phase: 'demographics', participant_id: participantId, group: group },
    on_finish: function(data) {
        data.gender = data.response === 0 ? 'Kobieta' : data.response === 1 ? 'Mężczyzna' : 'Inna';
        participantGender = data.gender;
        data.DaneOsob = `group:${group},age:${participantAge || 'Brak'},gender:${participantGender}`;
    }
};
timeline.push(genderTrial);

// Informacja o teście
const testInfo = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Zaraz zacznie się badanie.</h2>
        <p>Przygotuj się do zapamiętywania słów z list.</p>
        <p>Słowa będą wyświetlane na środku ekranu.</p>
        <p>Kliknięcie poniższego przycisku automatycznie spowoduje wyświetlenie się pierwszej listy.</p>
        <p>Pierwsze słowo wyświetli się od razu, więc bądź gotów.</p>
        <p>Kliknij przycisk, aby rozpocząć badanie.</p>
    `,
    choices: ['Przejdź do pierwszej listy'],
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
            },
            on_start: function() {
                if (firstWordTime === null && i === 0 && word === wordList[0]) {
                    firstWordTime = performance.now();
                }
            }
        };
        timeline.push(wordTrial);
    }

    // Narracja
    const narrationType = groups[group][i];
    const narrationText = narratives[listName][narrationType];
    const sentences = narrationText.split('.').map(s => s.trim()).filter(s => s);

    let fastSentences = [];
    let veryFastSentences = [];
    let narrationRTs = [];

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
                narrationRTs.push(data.rt);
                if (data.rt < 400) {
                    fastSentences.push(data.sentence);
                }
                if (data.rt < 300) {
                    veryFastSentences.push(data.sentence);
                }
                const lastThree = jsPsych.data.get().filter({phase: 'narration'}).last(3).values();
                if (data.rt < 300 && lastThree.length >= 3 && lastThree.every(trial => trial.rt < 300)) {
                    alert("Prosimy czytać zdania uważnie!");
                }
                if (j === sentences.length - 1) {
                    const hasFastSentences = fastSentences.length > 0;
                    const fastSentencesList = hasFastSentences ? fastSentences.join('; ') : '';
                    data.has_fast_sentences = hasFastSentences;
                    data.fast_sentences_list = fastSentencesList;
                    data.FastSentencesRows = veryFastSentences.length > 0 ? veryFastSentences : [];
                    const meanRT = narrationRTs.length > 0 ? (narrationRTs.reduce((a, b) => a + b, 0) / narrationRTs.length).toFixed(2) : null;
                    data.MeanNarrationRT = meanRT ? `${listName}:${meanRT}` : null;
                }
                data.DaneOsob = `group:${group},age:${participantAge || 'Brak'},gender:${participantGender || 'Brak'}`;
            }
        };
        timeline.push(sentenceTrial);
    }

    if (i < listOrder.length - 1) {
        const breakTrial = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
                <p>Od razu przejdź dalej.</p>
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
        <p>Wpisz odpowiedź liczbową w polu tekstowym. </p>
        <p>Kliknij przycisk, aby kontynuować.</p>
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
let recognitionData = {};

const recognitionIntro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Test rozpoznawania słów</h2>
        <p>Teraz zobaczysz pojedyncze słowa. Twoim zadaniem jest określenie, czy dane słowo pojawiło się wcześniej na którejś z czterech list słów.</p>
        <p>Jeśli słowo było na liście, naciśnij „Tak”. Jeśli nie, naciśnij „Nie”.</p>
        <p>Po każdym wyborze ocenisz swoją pewność na skali od 1 (zupełnie niepewny/a) do 5 (całkowicie pewny/a).</p>
        <p>Przykładowo, jeśli jesteś pewien/a, że danego słowa nie było na liście, zaznacz „Nie”, a potem 5 w skali pewności.</p>
        <p>Kliknij przycisk, aby kontynuować.</p>
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
        prompt: '<p>Czy to słowo pojawiło się wcześniej na którejś z list?</p>',
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
            console.log(`Word: ${word}, Response: ${data.response}`); // Debugowanie
            if (!recognitionData[word]) {
                recognitionData[word] = {
                    Stimulus: word,
                    Response: data.response === 0 ? "Tak" : "Nie",
                    ConfidenceResponse: null
                };
            }
            if (word === shuffledRecognitionList[shuffledRecognitionList.length - 1]) {
                lastRecognitionTime = performance.now();
                const timeToComplete = lastRecognitionTime - firstWordTime;
                data.TimeToComplete = Math.round(timeToComplete);
            }
            data.DaneOsob = `group:${group},age:${participantAge || 'Brak'},gender:${participantGender || 'Brak'}`;
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
            const confidenceValue = data.response[`confidence_${word}`] + 1;
            data.confidence_response = confidenceValue;
            if (recognitionData[word]) {
                recognitionData[word].ConfidenceResponse = confidenceValue;
                data.recognition_summary = recognitionData[word];
            } else {
                console.warn(`Brak danych rozpoznawania dla słowa: ${word}`);
            }
            data.DaneOsob = `group:${group},age:${participantAge || 'Brak'},gender:${participantGender || 'Brak'}`;
        }
    };
    timeline.push(confidenceTrial);
}

// Dodanie ConfidenceFinalSummary
const finalSummaryTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 'Badanie zostało ukończone. Kliknij przycisk aby zapisać wyniki.',
    choices: ['Zapisz'],
    on_finish: function() {
        console.log('recognitionData:', recognitionData);
        const finalSummary = fixedOrderWords.map(word => 
            recognitionData[word] || 
            { Stimulus: word, Response: "Brak", ConfidenceResponse: "Brak" }
        );
        jsPsych.data.addDataToLastTrial({
            ConfidenceFinalSummary: JSON.stringify(finalSummary),
            TimeToComplete: Math.round(lastRecognitionTime - firstWordTime),
            DaneOsob: `group:${group},age:${participantAge || 'Brak'},gender:${participantGender || 'Brak'}`
        });
    }
};
timeline.push(finalSummaryTrial);

// Zakończenie eksperymentu
const endMessage = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Dziękuję za udział w badaniu!</h2>
        <p>Twój udział w teście rozpoznawania słów został zapisany.</p>
        <p>Kliknij przycisk, aby zakończyć badanie.</p>
    `,
    choices: ['Zakończ'],
    data: { phase: 'instructions', participant_id: participantId, group: group },
    on_finish: function(data) {
        data.DaneOsob = `group:${group},age:${participantAge || 'Brak'},gender:${participantGender || 'Brak'}`;
    }
};
timeline.push(endMessage);

// Uruchomienie eksperymentu
jsPsych.run(timeline);
