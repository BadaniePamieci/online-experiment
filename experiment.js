// Sprawdzenie, czy PsychoJS jest załadowany
if (typeof PsychoJS === 'undefined') {
    alert('Błąd: Biblioteka PsychoJS nie została załadowana. Sprawdź połączenie z internetem lub pliki konfiguracyjne.');
    throw new Error('PsychoJS not loaded');
}

// Inicjalizacja PsychoJS
const psychoJS = new PsychoJS({
    debug: true
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

const listOrder = ["LEKARZ", "ŻYCZENIE", "WYSOKI", "GWIZDEK"];
const groups = {
    "critical": ["critical", "critical", "critical", "critical"],
    "non_critical": ["non_critical", "non_critical", "non_critical", "non_critical"],
    "neutral": ["neutral", "neutral", "neutral", "neutral"]
};

// Lista 30 słów do fazy recognition
const fullRecognitionList = [
    "stetoskop", "kitel", "fartuch", "słuchawki", "pediatra",  // LEKARZ
    "urodziny", "rozkaz", "kartka", "spełnienie", "prośba",    // ŻYCZENIE
    "chłopak", "dąb", "poziom", "przystojny", "długi",         // WYSOKI
    "sędzia", "hałas", "koniec", "sport", "piłka",             // GWIZDEK
    "lekarz", "życzenie", "wysoki", "gwizdek",                 // Słowa krytyczne
    "apteka", "most", "balon", "telewizor", "księżyc",         // Dystraktory
    "piasek", "motyl", "laptop", "rower", "zegar"              // Dystraktory
];

// Zadania matematyczne (5 prostych mnożeń)
const mathTasks = [
    { question: "2 × 3 =", answer: 6 },
    { question: "4 × 5 =", answer: 20 },
    { question: "3 × 7 =", answer: 21 },
    { question: "5 × 6 =", answer: 30 },
    { question: "8 × 2 =", answer: 16 }
];

// Funkcje pomocnicze
function assignToGroup() {
    const groupNames = Object.keys(groups);
    return groupNames[Math.floor(Math.random() * groupNames.length)];
}

async function showDemographics() {
    const age = prompt("Podaj swój wiek:");
    const gender = prompt("Podaj swoją płeć (Kobieta, Mężczyzna, Inna, Wolę nie podawać):");
    return { age, gender };
}

async function showInstructions() {
    const instructions = new visual.TextStim({
        win: psychoJS.window,
        text: "Witamy w badaniu naukowym. Wszystkie dane są anonimowe i będą wykorzystywane wyłącznie do celów naukowych.\n\n" +
              "Twoim zadaniem jest zapamiętanie jak najwięcej słów z każdej listy. Po każdej liście przeczytasz krótki tekst. Na koniec odbędzie się test rozpoznawania słów.\n\n" +
              "Naciśnij SPACJĘ, aby kontynuować.\n\n(Naciśnij ESC, aby wyjść w dowolnym momencie)",
        height: 0.04,
        color: 'black',
        wrapWidth: 1.8,
        bold: true
    });
    instructions.setAutoDraw(true);
    psychoJS.window.flip();
    await psychoJS.waitForKey(['space', 'escape']);
    instructions.setAutoDraw(false);
    if (psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) {
        return false;
    }
    return true;
}

async function showWordList(wordList) {
    for (const word of wordList) {
        const wordStim = new visual.TextStim({
            win: psychoJS.window,
            text: word,
            height: 0.08,
            color: 'black',
            bold: true
        });
        wordStim.setAutoDraw(true);
        psychoJS.window.flip();
        await psychoJS.waitFor(1000);
        wordStim.setAutoDraw(false);
        psychoJS.window.flip();
        await psychoJS.waitFor(500);
        if (psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) {
            return false;
        }
    }
    return true;
}

async function runNarration(narrationText) {
    const sentences = narrationText.split('.').map(s => s.trim()).filter(s => s);
    const results = [];

    const instr = new visual.TextStim({
        win: psychoJS.window,
        text: "Przeczytaj uważnie poniższe zdania. Twój czas będzie mierzony.\n\nNaciśnij SPACJĘ, aby kontynuować.\n\n(Naciśnij ESC aby wyjść)",
        height: 0.05,
        color: 'black',
        bold: true
    });
    instr.setAutoDraw(true);
    psychoJS.window.flip();
    await psychoJS.waitForKey(['space', 'escape']);
    instr.setAutoDraw(false);
    if (psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) {
        return [];
    }

    for (let i = 0; i < sentences.length; i++) {
        const text = new visual.TextStim({
            win: psychoJS.window,
            text: `Zdanie ${i + 1}:\n\n${sentences[i]}.`,
            height: 0.045,
            color: 'black',
            wrapWidth: 1.8,
            bold: true
        });
        text.setAutoDraw(true);
        psychoJS.window.flip();
        const startTime = Date.now();
        await psychoJS.waitForKey(['space', 'escape']);
        const readingTime = (Date.now() - startTime) / 1000;
        text.setAutoDraw(false);
        if (psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) {
            return [];
        }
        results.push({ sentence: sentences[i], reading_time_sec: readingTime });
    }
    return results;
}

async function runMathTask() {
    const results = [];
    for (let i = 0; i < mathTasks.length; i++) {
        const task = mathTasks[i];
        const questionText = new visual.TextStim({
            win: psychoJS.window,
            text: `Zadanie ${i + 1}: ${task.question}`,
            pos: [0, 0.2],
            height: 0.05,
            color: 'black',
            bold: true
        });
        const answer = prompt(`Podaj odpowiedź dla: ${task.question}`);
        const isCorrect = parseInt(answer) === task.answer;
        results.push({
            question: task.question,
            user_answer: answer,
            correct_answer: task.answer,
            is_correct: isCorrect
        });
        questionText.setAutoDraw(true);
        psychoJS.window.flip();
        await psychoJS.waitFor(500);
        questionText.setAutoDraw(false);
    }
    return results;
}

async function runRecognitionPhase(recognitionList) {
    psychoJS.util.shuffle(recognitionList);
    const results = [];
    psychoJS.window.units = 'pix';

    for (const word of recognitionList) {
        const wordText = new visual.TextStim({
            win: psychoJS.window,
            text: word,
            pos: [0, 100],
            height: 40,
            color: 'black'
        });
        const yesButton = new visual.ButtonStim({
            win: psychoJS.window,
            text: 'TAK',
            pos: [-100, -50],
            size: [100, 50],
            fillColor: '#66bb66'
        });
        const noButton = new visual.ButtonStim({
            win: psychoJS.window,
            text: 'NIE',
            pos: [100, -50],
            size: [100, 50],
            fillColor: '#dd6666'
        });
        const confidenceSlider = new visual.Slider({
            win: psychoJS.window,
            pos: [0, -150],
            size: [300, 20],
            labels: ['0%', '100%'],
            ticks: [0, 100],
            granularity: 1,
            style: ['rating']
        });
        const nextButton = new visual.ButtonStim({
            win: psychoJS.window,
            text: 'Przejdź dalej',
            pos: [0, -250],
            size: [150, 50],
            fillColor: '#5555ff'
        });

        wordText.setAutoDraw(true);
        yesButton.setAutoDraw(true);
        noButton.setAutoDraw(true);
        confidenceSlider.setAutoDraw(true);
        nextButton.setAutoDraw(true);
        psychoJS.window.flip();

        let response = null;
        let submitted = false;
        while (!submitted) {
            if (yesButton.isClicked) response = 'TAK';
            if (noButton.isClicked) response = 'NIE';
            if (nextButton.isClicked && response !== null) submitted = true;
            if (psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) {
                return null;
            }
            await psychoJS.waitFor(20);
        }

        const confidence = confidenceSlider.getRating();
        results.push({ word, response, confidence });

        wordText.setAutoDraw(false);
        yesButton.setAutoDraw(false);
        noButton.setAutoDraw(false);
        confidenceSlider.setAutoDraw(false);
        nextButton.setAutoDraw(false);
    }
    psychoJS.window.units = 'norm';
    return results;
}

async function saveDataToOSF(data) {
    const filename = `results_${new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 15)}.csv`;
    const csvData = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    // Zastąp 'YOUR_DATAPIPE_EXPERIMENT_ID' swoim ID z DataPipe
    const response = await fetch('https://pipe.jspsych.org/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify({
            experimentID: 'nIbjy3keQoaX',
            filename: filename,
            data: csvData
        })
    });
    return response.json();
}

async function runExperiment() {
    psychoJS.openWindow({
        fullscr: true,
        color: 'white',
        units: 'norm'
    });

    const demographics = await showDemographics();
    const group = assignToGroup();
    const participantId = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 15);

    if (!(await showInstructions())) {
        psychoJS.quit();
        return;
    }

    psychoJS.util.shuffle(listOrder);
    const narrativesData = [];
    const recognitionData = [];

    for (let i = 0; i < listOrder.length; i++) {
        const listName = listOrder[i];
        const wordList = wordLists[listName];
        if (!(await showWordList(wordList))) break;

        const narrationType = groups[group][i];
        const narrationText = narratives[listName][narrationType];
        const narrationResults = await runNarration(narrationText);
        if (!narrationResults.length && i > 0) break;

        const row = {
            participant_id: participantId,
            age: demographics.age,
            gender: demographics.gender,
            group: group,
            trial_number: i + 1,
            list_name: listName
        };
        for (let j = 0; j < 5; j++) {
            row['reading_time_sentence_' + (j + 1)] = j < narrationResults.length ? narrationResults[j].reading_time_sec : null;
        }
        narrativesData.push(row);

        if (i < listOrder.length - 1) {
            const breakText = new visual.TextStim({
                win: psychoJS.window,
                text: "Krótka przerwa...\n\nPrzygotuj się na następną listę słów.\n\n(Naciśnij ESC aby wyjść)",
                height: 0.05,
                color: 'black',
                bold: true
            });
            breakText.setAutoDraw(true);
            psychoJS.window.flip();
            await psychoJS.waitFor(2000);
            breakText.setAutoDraw(false);
            if (psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) break;
        }
    }

    // Zadanie dystrakcyjne (matematyczne)
    const mathIntro = new visual.TextStim({
        win: psychoJS.window,
        text: "Teraz rozwiąż 5 prostych zadań matematycznych.\n\nNaciśnij SPACJĘ, aby kontynuować.\n\n(Naciśnij ESC aby wyjść)",
        height: 0.05,
        color: 'black',
        bold: true
    });
    mathIntro.setAutoDraw(true);
    psychoJS.window.flip();
    await psychoJS.waitForKey(['space', 'escape']);
    mathIntro.setAutoDraw(false);
    if (psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) {
        psychoJS.quit();
        return;
    }

    const mathResults = await runMathTask();

    // Faza rozpoznawania
    const recognitionIntro = new visual.TextStim({
        win: psychoJS.window,
        text: "Teraz przystąpisz do testu rozpoznawania.\n\nNaciśnij SPACJĘ, aby kontynuować.\n\n(Naciśnij ESC aby wyjść)",
        height: 0.05,
        color: 'black',
        bold: true
    });
    recognitionIntro.setAutoDraw(true);
    psychoJS.window.flip();
    await psychoJS.waitForKey(['space', 'escape']);
    recognitionIntro.setAutoDraw(false);
    if (psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) {
        psychoJS.quit();
        return;
    }

    const recognitionResults = await runRecognitionPhase(fullRecognitionList);
    if (!recognitionResults) {
        psychoJS.quit();
        return;
    }

    for (const recognition of recognitionResults) {
        recognitionData.push({
            participant_id: participantId,
            age: demographics.age,
            gender: demographics.gender,
            group: group,
            recognition_word: recognition.word,
            recognition_response: recognition.response,
            confidence_percent: recognition.confidence
        });
    }

    // Zapis danych
    await saveDataToOSF(narrativesData);
    await saveDataToOSF(recognitionData);

    const endText = new visual.TextStim({
        win: psychoJS.window,
        text: "Dziękujemy za udział w badaniu!\n\nMożesz zamknąć okno.",
        height: 0.05,
        color: 'black',
        bold: true
    });
    endText.setAutoDraw(true);
    psychoJS.window.flip();
    await psychoJS.waitForKey();
    psychoJS.quit();
}

psychoJS.start({
    expName: 'OnlineExperiment',
    run: runExperiment
});
