// ================================================================
// ENGLISH TRAINER — Complete Module
// Paste this entire script at the bottom of your HTML file,
// just BEFORE </body> — it replaces/extends the English Trainer page.
//
// FITUR:
// ✅ Kosakata Indo→English & English→Indo
// ✅ Quiz ketik jawaban (kata & kalimat)
// ✅ Pilihan ganda (MCQ)
// ✅ Tahapan belajar: Pemula → Menengah → Mahir → Profesional
// ✅ Kategori: Percakapan, Verba, Tenses, Frasa Idiom, Business, dll
// ✅ Input / tambah kata baru (tersimpan di localStorage)
// ✅ Sistem XP, Combo, Streak
// ✅ Hint & Contoh kalimat
// ================================================================
'use strict';

// ================================================================
// UTILITAS RANDOM
// ================================================================
const ENRng = {
  pick: (arr) => arr[Math.floor(Math.random() * arr.length)],
  shuffle: (arr) => [...arr].sort(() => Math.random() - 0.5),
  range: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
};

// ================================================================
// DATABASE KOSAKATA — INDO ↔ ENGLISH
// ================================================================
const EN_VOCAB_DB = {

  // ── LEVEL 1: PEMULA — Kosakata Dasar Sehari-hari ──────────────
  level1: [
    // Salam & Perkenalan
    { en: 'Hello', id: 'Halo', cat: 'Salam', example: 'Hello, my name is Budi.' },
    { en: 'Good morning', id: 'Selamat pagi', cat: 'Salam', example: 'Good morning! How are you?' },
    { en: 'Good afternoon', id: 'Selamat siang', cat: 'Salam', example: 'Good afternoon, sir.' },
    { en: 'Good evening', id: 'Selamat malam', cat: 'Salam', example: 'Good evening, everyone.' },
    { en: 'Goodbye', id: 'Sampai jumpa', cat: 'Salam', example: 'Goodbye! See you tomorrow.' },
    { en: 'Thank you', id: 'Terima kasih', cat: 'Salam', example: 'Thank you for your help.' },
    { en: 'You\'re welcome', id: 'Sama-sama', cat: 'Salam', example: 'You\'re welcome! Anytime.' },
    { en: 'Please', id: 'Tolong / Silakan', cat: 'Salam', example: 'Please sit down.' },
    { en: 'Sorry', id: 'Maaf', cat: 'Salam', example: 'Sorry, I am late.' },
    { en: 'Excuse me', id: 'Permisi', cat: 'Salam', example: 'Excuse me, where is the bathroom?' },
    { en: 'Yes', id: 'Ya', cat: 'Dasar', example: 'Yes, I understand.' },
    { en: 'No', id: 'Tidak', cat: 'Dasar', example: 'No, that is wrong.' },
    { en: 'Maybe', id: 'Mungkin', cat: 'Dasar', example: 'Maybe I will come tomorrow.' },
    { en: 'Of course', id: 'Tentu saja', cat: 'Dasar', example: 'Of course I can help you.' },

    // Angka & Waktu
    { en: 'Today', id: 'Hari ini', cat: 'Waktu', example: 'Today is Monday.' },
    { en: 'Tomorrow', id: 'Besok', cat: 'Waktu', example: 'I will call you tomorrow.' },
    { en: 'Yesterday', id: 'Kemarin', cat: 'Waktu', example: 'Yesterday was Sunday.' },
    { en: 'Now', id: 'Sekarang', cat: 'Waktu', example: 'I am busy now.' },
    { en: 'Later', id: 'Nanti', cat: 'Waktu', example: 'I will do it later.' },
    { en: 'Morning', id: 'Pagi', cat: 'Waktu', example: 'I wake up in the morning.' },
    { en: 'Afternoon', id: 'Siang/Sore', cat: 'Waktu', example: 'I have lunch in the afternoon.' },
    { en: 'Night', id: 'Malam', cat: 'Waktu', example: 'Good night, sleep well.' },
    { en: 'Week', id: 'Minggu', cat: 'Waktu', example: 'I work five days a week.' },
    { en: 'Month', id: 'Bulan', cat: 'Waktu', example: 'January is the first month.' },
    { en: 'Year', id: 'Tahun', cat: 'Waktu', example: 'This year is 2024.' },

    // Kata Tanya Dasar
    { en: 'What', id: 'Apa', cat: 'Kata Tanya', example: 'What is your name?' },
    { en: 'Who', id: 'Siapa', cat: 'Kata Tanya', example: 'Who is that person?' },
    { en: 'Where', id: 'Di mana', cat: 'Kata Tanya', example: 'Where do you live?' },
    { en: 'When', id: 'Kapan', cat: 'Kata Tanya', example: 'When will you arrive?' },
    { en: 'Why', id: 'Mengapa', cat: 'Kata Tanya', example: 'Why are you sad?' },
    { en: 'How', id: 'Bagaimana', cat: 'Kata Tanya', example: 'How are you doing?' },
    { en: 'How much', id: 'Berapa', cat: 'Kata Tanya', example: 'How much is this?' },
    { en: 'How many', id: 'Berapa banyak', cat: 'Kata Tanya', example: 'How many books do you have?' },
    { en: 'Which', id: 'Yang mana', cat: 'Kata Tanya', example: 'Which color do you like?' },

    // Kata Sifat Dasar
    { en: 'Good', id: 'Baik / Bagus', cat: 'Kata Sifat', example: 'This food is very good.' },
    { en: 'Bad', id: 'Buruk / Jelek', cat: 'Kata Sifat', example: 'That was a bad idea.' },
    { en: 'Big', id: 'Besar', cat: 'Kata Sifat', example: 'That is a big house.' },
    { en: 'Small', id: 'Kecil', cat: 'Kata Sifat', example: 'I have a small cat.' },
    { en: 'Hot', id: 'Panas', cat: 'Kata Sifat', example: 'This coffee is very hot.' },
    { en: 'Cold', id: 'Dingin', cat: 'Kata Sifat', example: 'The water is cold.' },
    { en: 'Fast', id: 'Cepat', cat: 'Kata Sifat', example: 'He is a fast runner.' },
    { en: 'Slow', id: 'Lambat', cat: 'Kata Sifat', example: 'The turtle is slow.' },
    { en: 'Happy', id: 'Senang / Bahagia', cat: 'Kata Sifat', example: 'I am happy today.' },
    { en: 'Sad', id: 'Sedih', cat: 'Kata Sifat', example: 'Why are you sad?' },
    { en: 'Beautiful', id: 'Cantik / Indah', cat: 'Kata Sifat', example: 'What a beautiful flower!' },
    { en: 'Expensive', id: 'Mahal', cat: 'Kata Sifat', example: 'This watch is too expensive.' },
    { en: 'Cheap', id: 'Murah', cat: 'Kata Sifat', example: 'This shirt is very cheap.' },
    { en: 'Easy', id: 'Mudah', cat: 'Kata Sifat', example: 'This question is easy.' },
    { en: 'Difficult', id: 'Sulit / Sukar', cat: 'Kata Sifat', example: 'Math is difficult for me.' },
    { en: 'New', id: 'Baru', cat: 'Kata Sifat', example: 'I bought a new phone.' },
    { en: 'Old', id: 'Lama / Tua', cat: 'Kata Sifat', example: 'This building is very old.' },
    { en: 'Full', id: 'Penuh / Kenyang', cat: 'Kata Sifat', example: 'I am full, thank you.' },
    { en: 'Hungry', id: 'Lapar', cat: 'Kata Sifat', example: 'I am so hungry right now.' },
    { en: 'Tired', id: 'Lelah / Capek', cat: 'Kata Sifat', example: 'I feel tired after work.' },

    // Kata Kerja Dasar (Verb)
    { en: 'Go', id: 'Pergi', cat: 'Verb Dasar', example: 'I go to school every day.' },
    { en: 'Come', id: 'Datang', cat: 'Verb Dasar', example: 'Please come here.' },
    { en: 'Eat', id: 'Makan', cat: 'Verb Dasar', example: 'I eat rice for lunch.' },
    { en: 'Drink', id: 'Minum', cat: 'Verb Dasar', example: 'I drink water every morning.' },
    { en: 'Sleep', id: 'Tidur', cat: 'Verb Dasar', example: 'I sleep at 10 PM.' },
    { en: 'Wake up', id: 'Bangun (tidur)', cat: 'Verb Dasar', example: 'I wake up at 6 AM.' },
    { en: 'Work', id: 'Bekerja', cat: 'Verb Dasar', example: 'She works at a hospital.' },
    { en: 'Study', id: 'Belajar', cat: 'Verb Dasar', example: 'I study English every day.' },
    { en: 'Read', id: 'Membaca', cat: 'Verb Dasar', example: 'I like to read books.' },
    { en: 'Write', id: 'Menulis', cat: 'Verb Dasar', example: 'Please write your name here.' },
    { en: 'Buy', id: 'Membeli', cat: 'Verb Dasar', example: 'I want to buy a new bag.' },
    { en: 'Sell', id: 'Menjual', cat: 'Verb Dasar', example: 'They sell fresh vegetables.' },
    { en: 'Say', id: 'Berkata / Mengatakan', cat: 'Verb Dasar', example: 'What did you say?' },
    { en: 'Ask', id: 'Bertanya', cat: 'Verb Dasar', example: 'Let me ask the teacher.' },
    { en: 'Answer', id: 'Menjawab', cat: 'Verb Dasar', example: 'Please answer the question.' },
    { en: 'Open', id: 'Membuka', cat: 'Verb Dasar', example: 'Please open the door.' },
    { en: 'Close', id: 'Menutup', cat: 'Verb Dasar', example: 'Close the window, please.' },
    { en: 'Help', id: 'Membantu', cat: 'Verb Dasar', example: 'Can you help me?' },
    { en: 'Know', id: 'Tahu / Mengetahui', cat: 'Verb Dasar', example: 'I don\'t know the answer.' },
    { en: 'Understand', id: 'Mengerti / Memahami', cat: 'Verb Dasar', example: 'Do you understand?' },
    { en: 'Like', id: 'Suka / Menyukai', cat: 'Verb Dasar', example: 'I like playing soccer.' },
    { en: 'Love', id: 'Cinta / Mencintai', cat: 'Verb Dasar', example: 'I love my family.' },
    { en: 'Want', id: 'Ingin / Mau', cat: 'Verb Dasar', example: 'I want a glass of water.' },
    { en: 'Need', id: 'Perlu / Butuh', cat: 'Verb Dasar', example: 'I need your help.' },
    { en: 'Have', id: 'Punya / Memiliki', cat: 'Verb Dasar', example: 'I have two brothers.' },
    { en: 'See', id: 'Melihat', cat: 'Verb Dasar', example: 'Can you see that bird?' },
    { en: 'Hear', id: 'Mendengar', cat: 'Verb Dasar', example: 'I can\'t hear you clearly.' },
    { en: 'Think', id: 'Berpikir', cat: 'Verb Dasar', example: 'I think you are right.' },
    { en: 'Feel', id: 'Merasa', cat: 'Verb Dasar', example: 'How do you feel today?' },
    { en: 'Try', id: 'Mencoba', cat: 'Verb Dasar', example: 'Try your best!' },
  ],

  // ── LEVEL 2: PEMULA LANJUT — Kalimat Percakapan ───────────────
  level2: [
    // Percakapan Umum (frasa/kalimat)
    { en: 'How are you?', id: 'Apa kabar?', cat: 'Percakapan', example: 'Hello! How are you today?' },
    { en: 'I\'m fine, thank you.', id: 'Saya baik-baik saja, terima kasih.', cat: 'Percakapan', example: 'How are you? — I\'m fine, thank you.' },
    { en: 'What is your name?', id: 'Siapa nama kamu?', cat: 'Percakapan', example: 'Hi! What is your name?' },
    { en: 'My name is ...', id: 'Nama saya ...', cat: 'Percakapan', example: 'My name is Siti.' },
    { en: 'Where are you from?', id: 'Kamu dari mana?', cat: 'Percakapan', example: 'Nice to meet you. Where are you from?' },
    { en: 'I am from Indonesia.', id: 'Saya dari Indonesia.', cat: 'Percakapan', example: 'I am from Indonesia. Where are you from?' },
    { en: 'How old are you?', id: 'Berapa umurmu?', cat: 'Percakapan', example: 'May I ask, how old are you?' },
    { en: 'I am ... years old.', id: 'Saya berumur ... tahun.', cat: 'Percakapan', example: 'I am twenty years old.' },
    { en: 'Nice to meet you.', id: 'Senang bertemu denganmu.', cat: 'Percakapan', example: 'Hello! Nice to meet you.' },
    { en: 'See you later.', id: 'Sampai ketemu lagi.', cat: 'Percakapan', example: 'I have to go. See you later!' },
    { en: 'Take care.', id: 'Jaga diri baik-baik.', cat: 'Percakapan', example: 'Goodbye! Take care.' },
    { en: 'Have a nice day.', id: 'Semoga harimu menyenangkan.', cat: 'Percakapan', example: 'Bye! Have a nice day.' },
    { en: 'I don\'t understand.', id: 'Saya tidak mengerti.', cat: 'Percakapan', example: 'Sorry, I don\'t understand. Can you repeat?' },
    { en: 'Can you repeat that?', id: 'Bisakah kamu mengulanginya?', cat: 'Percakapan', example: 'I missed that. Can you repeat that?' },
    { en: 'Can you speak slowly?', id: 'Bisakah kamu bicara lebih pelan?', cat: 'Percakapan', example: 'Can you speak slowly, please?' },
    { en: 'What does this mean?', id: 'Apa artinya ini?', cat: 'Percakapan', example: 'What does this word mean?' },
    { en: 'How do you spell it?', id: 'Bagaimana ejaannya?', cat: 'Percakapan', example: 'How do you spell your last name?' },
    { en: 'I\'m sorry, I was wrong.', id: 'Maaf, saya salah.', cat: 'Percakapan', example: 'I\'m sorry, I was wrong about that.' },
    { en: 'No problem.', id: 'Tidak masalah.', cat: 'Percakapan', example: 'No problem! I can help you.' },
    { en: 'Of course!', id: 'Tentu saja!', cat: 'Percakapan', example: 'Can you help me? — Of course!' },
    { en: 'That\'s right.', id: 'Benar sekali.', cat: 'Percakapan', example: 'Is this correct? — That\'s right.' },
    { en: 'I agree.', id: 'Saya setuju.', cat: 'Percakapan', example: 'I think we should go early. — I agree.' },
    { en: 'I disagree.', id: 'Saya tidak setuju.', cat: 'Percakapan', example: 'That plan is good. — I disagree, actually.' },
    { en: 'Let me think.', id: 'Biarkan saya berpikir dulu.', cat: 'Percakapan', example: 'What do you want to eat? — Let me think.' },
    { en: 'I\'m not sure.', id: 'Saya tidak yakin.', cat: 'Percakapan', example: 'Is she coming? — I\'m not sure.' },
    { en: 'What time is it?', id: 'Jam berapa sekarang?', cat: 'Percakapan', example: 'Excuse me, what time is it?' },
    { en: 'Wait a moment.', id: 'Tunggu sebentar.', cat: 'Percakapan', example: 'Can I speak to Budi? — Wait a moment, please.' },
    { en: 'Are you okay?', id: 'Apakah kamu baik-baik saja?', cat: 'Percakapan', example: 'You look pale. Are you okay?' },
    { en: 'I\'m tired.', id: 'Saya lelah.', cat: 'Percakapan', example: 'I\'m tired. I need to rest.' },
    { en: 'I\'m hungry.', id: 'Saya lapar.', cat: 'Percakapan', example: 'Let\'s eat. I\'m hungry.' },

    // Percakapan di Warung / Restoran
    { en: 'I would like to order...', id: 'Saya ingin memesan...', cat: 'Restoran', example: 'I would like to order fried rice, please.' },
    { en: 'What do you recommend?', id: 'Apa yang kamu rekomendasikan?', cat: 'Restoran', example: 'This is my first time here. What do you recommend?' },
    { en: 'How much does it cost?', id: 'Berapa harganya?', cat: 'Restoran', example: 'Excuse me, how much does it cost?' },
    { en: 'The bill, please.', id: 'Tolong tagihan/bonnya.', cat: 'Restoran', example: 'We are done. The bill, please.' },
    { en: 'Is it spicy?', id: 'Apakah ini pedas?', cat: 'Restoran', example: 'Is this dish spicy?' },
    { en: 'A table for two, please.', id: 'Meja untuk dua orang, tolong.', cat: 'Restoran', example: 'Good evening! A table for two, please.' },
  ],

  // ── LEVEL 3: MENENGAH — Verba & Tenses ────────────────────────
  level3: [
    // Verba Irregular (V1 / V2 / V3)
    { en: 'Go / Went / Gone', id: 'Pergi (sekarang / lampau / partisip)', cat: 'Irregular Verb', example: 'I go to school. / I went to school. / I have gone to school.' },
    { en: 'Come / Came / Come', id: 'Datang (sekarang / lampau / partisip)', cat: 'Irregular Verb', example: 'She comes early. / She came early. / She has come.' },
    { en: 'Eat / Ate / Eaten', id: 'Makan', cat: 'Irregular Verb', example: 'We eat rice. / We ate rice. / We have eaten.' },
    { en: 'Drink / Drank / Drunk', id: 'Minum', cat: 'Irregular Verb', example: 'He drinks water. / He drank water. / He has drunk.' },
    { en: 'See / Saw / Seen', id: 'Melihat', cat: 'Irregular Verb', example: 'I see a bird. / I saw a bird. / I have seen a bird.' },
    { en: 'Take / Took / Taken', id: 'Mengambil', cat: 'Irregular Verb', example: 'Take the book. / He took the book. / He has taken the book.' },
    { en: 'Give / Gave / Given', id: 'Memberi', cat: 'Irregular Verb', example: 'Give me that. / She gave me that. / She has given me that.' },
    { en: 'Get / Got / Got', id: 'Mendapatkan', cat: 'Irregular Verb', example: 'I get a gift. / I got a gift. / I have got a gift.' },
    { en: 'Make / Made / Made', id: 'Membuat', cat: 'Irregular Verb', example: 'Make a cake. / She made a cake. / She has made a cake.' },
    { en: 'Write / Wrote / Written', id: 'Menulis', cat: 'Irregular Verb', example: 'I write a letter. / I wrote a letter. / I have written.' },
    { en: 'Read / Read / Read', id: 'Membaca (diucap berbeda)', cat: 'Irregular Verb', example: 'I read daily. / I read yesterday. / I have read it.' },
    { en: 'Speak / Spoke / Spoken', id: 'Berbicara', cat: 'Irregular Verb', example: 'She speaks well. / She spoke well. / She has spoken.' },
    { en: 'Know / Knew / Known', id: 'Mengetahui', cat: 'Irregular Verb', example: 'I know him. / I knew him. / I have known him for years.' },
    { en: 'Think / Thought / Thought', id: 'Berpikir', cat: 'Irregular Verb', example: 'Think carefully. / He thought carefully. / He has thought about it.' },
    { en: 'Buy / Bought / Bought', id: 'Membeli', cat: 'Irregular Verb', example: 'Buy some bread. / I bought bread. / I have bought bread.' },
    { en: 'Bring / Brought / Brought', id: 'Membawa', cat: 'Irregular Verb', example: 'Bring your book. / She brought her book. / She has brought it.' },
    { en: 'Find / Found / Found', id: 'Menemukan', cat: 'Irregular Verb', example: 'I find it interesting. / I found my key. / I have found my key.' },
    { en: 'Lose / Lost / Lost', id: 'Kehilangan / Kalah', cat: 'Irregular Verb', example: 'Don\'t lose hope. / He lost his wallet. / He has lost it.' },
    { en: 'Run / Ran / Run', id: 'Berlari', cat: 'Irregular Verb', example: 'I run every morning. / I ran a marathon. / I have run 5 km.' },
    { en: 'Sit / Sat / Sat', id: 'Duduk', cat: 'Irregular Verb', example: 'Sit here. / She sat there. / She has sat for hours.' },
    { en: 'Stand / Stood / Stood', id: 'Berdiri', cat: 'Irregular Verb', example: 'Stand up, please. / He stood up. / He has stood all day.' },
    { en: 'Sleep / Slept / Slept', id: 'Tidur', cat: 'Irregular Verb', example: 'I sleep early. / I slept early. / I have slept well.' },
    { en: 'Wake / Woke / Woken', id: 'Bangun tidur', cat: 'Irregular Verb', example: 'I wake at 6. / I woke at 6. / I have woken up.' },
    { en: 'Fall / Fell / Fallen', id: 'Jatuh', cat: 'Irregular Verb', example: 'Don\'t fall. / He fell down. / He has fallen.' },
    { en: 'Break / Broke / Broken', id: 'Memecahkan / Rusak', cat: 'Irregular Verb', example: 'Don\'t break it. / He broke it. / It has been broken.' },
    { en: 'Choose / Chose / Chosen', id: 'Memilih', cat: 'Irregular Verb', example: 'Choose wisely. / She chose wisely. / She has chosen.' },
    { en: 'Teach / Taught / Taught', id: 'Mengajar', cat: 'Irregular Verb', example: 'She teaches English. / She taught us. / She has taught me.' },
    { en: 'Meet / Met / Met', id: 'Bertemu', cat: 'Irregular Verb', example: 'Let\'s meet tomorrow. / We met yesterday. / We have met before.' },
    { en: 'Leave / Left / Left', id: 'Pergi / Meninggalkan', cat: 'Irregular Verb', example: 'I leave at 7. / I left at 7. / I have left.' },
    { en: 'Tell / Told / Told', id: 'Memberitahu', cat: 'Irregular Verb', example: 'Tell me the truth. / He told me. / He has told me.' },

    // Tenses — Simple Present
    { en: 'I work every day.', id: 'Saya bekerja setiap hari.', cat: 'Simple Present', example: 'Pattern: Subject + V1 (s/es)' },
    { en: 'She cooks dinner.', id: 'Dia (perempuan) memasak makan malam.', cat: 'Simple Present', example: 'She cooks = dia memasak (he/she/it + V1+s)' },
    { en: 'They play soccer.', id: 'Mereka bermain sepak bola.', cat: 'Simple Present', example: 'They play = mereka bermain' },
    { en: 'Does he study?', id: 'Apakah dia (laki-laki) belajar?', cat: 'Simple Present', example: 'Does + he/she/it + V1?' },
    { en: 'I do not speak French.', id: 'Saya tidak berbicara bahasa Prancis.', cat: 'Simple Present', example: 'Subject + do/does + not + V1' },

    // Past Tense
    { en: 'I worked yesterday.', id: 'Saya bekerja kemarin.', cat: 'Simple Past', example: 'Pattern: Subject + V2' },
    { en: 'She ate a mango.', id: 'Dia makan mangga.', cat: 'Simple Past', example: 'Past tense: ate (from eat)' },
    { en: 'Did you go there?', id: 'Apakah kamu pergi ke sana?', cat: 'Simple Past', example: 'Did + subject + V1?' },
    { en: 'I did not see him.', id: 'Saya tidak melihatnya.', cat: 'Simple Past', example: 'Subject + did not + V1' },

    // Present Continuous
    { en: 'I am studying now.', id: 'Saya sedang belajar sekarang.', cat: 'Present Continuous', example: 'Pattern: Subject + am/is/are + V-ing' },
    { en: 'She is cooking.', id: 'Dia sedang memasak.', cat: 'Present Continuous', example: 'is + cooking = sedang memasak' },
    { en: 'Are they coming?', id: 'Apakah mereka sedang datang?', cat: 'Present Continuous', example: 'Are + subject + V-ing?' },
    { en: 'He is not sleeping.', id: 'Dia tidak sedang tidur.', cat: 'Present Continuous', example: 'is not + sleeping = tidak sedang tidur' },

    // Future Tense
    { en: 'I will call you.', id: 'Saya akan meneleponmu.', cat: 'Future Tense', example: 'will + V1 = akan' },
    { en: 'She is going to travel.', id: 'Dia akan bepergian.', cat: 'Future Tense', example: 'be going to = berencana akan' },
    { en: 'Will you help me?', id: 'Maukah kamu membantuku?', cat: 'Future Tense', example: 'Will + subject + V1?' },
  ],

  // ── LEVEL 4: MENENGAH ATAS — Frasa & Idiom Percakapan ─────────
  level4: [
    { en: 'Break a leg!', id: 'Semoga berhasil! (idiom)', cat: 'Idiom', example: 'You have an exam tomorrow? Break a leg!' },
    { en: 'Hit the sack.', id: 'Pergi tidur (idiom).', cat: 'Idiom', example: 'I\'m exhausted. I\'m going to hit the sack.' },
    { en: 'Under the weather.', id: 'Tidak enak badan / sakit (idiom).', cat: 'Idiom', example: 'I\'m feeling a bit under the weather today.' },
    { en: 'Bite the bullet.', id: 'Hadapi dengan tabah (idiom).', cat: 'Idiom', example: 'Just bite the bullet and do the hard work.' },
    { en: 'Piece of cake.', id: 'Sangat mudah (idiom).', cat: 'Idiom', example: 'That exam was a piece of cake.' },
    { en: 'Costs an arm and a leg.', id: 'Sangat mahal (idiom).', cat: 'Idiom', example: 'That car costs an arm and a leg.' },
    { en: 'Once in a blue moon.', id: 'Sangat jarang (idiom).', cat: 'Idiom', example: 'He visits us once in a blue moon.' },
    { en: 'Hit the nail on the head.', id: 'Tepat sekali (idiom).', cat: 'Idiom', example: 'You hit the nail on the head with that idea.' },
    { en: 'Spill the beans.', id: 'Membocorkan rahasia (idiom).', cat: 'Idiom', example: 'Don\'t spill the beans about the surprise party.' },
    { en: 'Let the cat out of the bag.', id: 'Membocorkan rahasia (idiom).', cat: 'Idiom', example: 'She let the cat out of the bag too early.' },
    { en: 'Beat around the bush.', id: 'Berbicara berbelit-belit (idiom).', cat: 'Idiom', example: 'Stop beating around the bush and say it.' },
    { en: 'On the fence.', id: 'Ragu-ragu / belum memutuskan (idiom).', cat: 'Idiom', example: 'I\'m still on the fence about that decision.' },

    // Frasa Umum Percakapan
    { en: 'By the way', id: 'Ngomong-ngomong / Omong-omong', cat: 'Frasa', example: 'By the way, did you see that movie?' },
    { en: 'On the other hand', id: 'Di sisi lain', cat: 'Frasa', example: 'It\'s cheap. On the other hand, the quality is poor.' },
    { en: 'In other words', id: 'Dengan kata lain', cat: 'Frasa', example: 'He failed the test. In other words, he needs to study more.' },
    { en: 'As a result', id: 'Akibatnya / Hasilnya', cat: 'Frasa', example: 'He studied hard. As a result, he passed the exam.' },
    { en: 'For example', id: 'Misalnya / Contohnya', cat: 'Frasa', example: 'I like sports, for example, swimming and cycling.' },
    { en: 'In addition', id: 'Selain itu / Tambahan lagi', cat: 'Frasa', example: 'The food was great. In addition, the service was excellent.' },
    { en: 'However', id: 'Namun / Akan tetapi', cat: 'Frasa', example: 'I wanted to go. However, I was too tired.' },
    { en: 'Therefore', id: 'Oleh karena itu / Maka', cat: 'Frasa', example: 'It was raining. Therefore, we stayed home.' },
    { en: 'Although / Even though', id: 'Walaupun / Meskipun', cat: 'Frasa', example: 'Although it was cold, she went swimming.' },
    { en: 'As soon as', id: 'Begitu / Sesegera mungkin', cat: 'Frasa', example: 'Call me as soon as you arrive.' },
    { en: 'So far', id: 'Sejauh ini', cat: 'Frasa', example: 'So far, everything is going well.' },
    { en: 'At least', id: 'Setidaknya', cat: 'Frasa', example: 'At least you tried your best.' },
    { en: 'In fact', id: 'Sebenarnya / Faktanya', cat: 'Frasa', example: 'In fact, he is a very good teacher.' },
    { en: 'It depends.', id: 'Tergantung.', cat: 'Frasa', example: 'Will you come? — It depends on the weather.' },
    { en: 'That\'s a good point.', id: 'Itu poin yang bagus.', cat: 'Frasa', example: 'We should start earlier. — That\'s a good point.' },
    { en: 'What do you mean?', id: 'Maksud kamu apa?', cat: 'Frasa', example: 'What do you mean by that?' },
    { en: 'I see what you mean.', id: 'Saya mengerti maksud kamu.', cat: 'Frasa', example: 'I see what you mean. That makes sense.' },
    { en: 'To be honest', id: 'Jujur saja', cat: 'Frasa', example: 'To be honest, I don\'t like that plan.' },
    { en: 'In my opinion', id: 'Menurut saya', cat: 'Frasa', example: 'In my opinion, we should wait.' },
    { en: 'As far as I know', id: 'Sejauh yang saya tahu', cat: 'Frasa', example: 'As far as I know, the meeting is at 10.' },
  ],

  // ── LEVEL 5: MAHIR — Kosakata Business & Formal ───────────────
  level5: [
    { en: 'Negotiate', id: 'Bernegosiasi', cat: 'Business', example: 'We need to negotiate the contract terms.' },
    { en: 'Deadline', id: 'Batas waktu', cat: 'Business', example: 'The deadline is next Friday.' },
    { en: 'Proposal', id: 'Proposal / Rancangan', cat: 'Business', example: 'Please submit your proposal by Monday.' },
    { en: 'Target', id: 'Target / Sasaran', cat: 'Business', example: 'We achieved our sales target.' },
    { en: 'Budget', id: 'Anggaran', cat: 'Business', example: 'We need to stay within the budget.' },
    { en: 'Revenue', id: 'Pendapatan / Omzet', cat: 'Business', example: 'Our revenue increased this quarter.' },
    { en: 'Profit', id: 'Laba / Keuntungan', cat: 'Business', example: 'The company made a big profit last year.' },
    { en: 'Investment', id: 'Investasi', cat: 'Business', example: 'This is a smart investment.' },
    { en: 'Partnership', id: 'Kemitraan', cat: 'Business', example: 'We formed a partnership with that company.' },
    { en: 'Strategy', id: 'Strategi', cat: 'Business', example: 'We need a better marketing strategy.' },
    { en: 'Priority', id: 'Prioritas', cat: 'Business', example: 'Customer satisfaction is our priority.' },
    { en: 'Feedback', id: 'Umpan balik / Masukan', cat: 'Business', example: 'Please give me your feedback on this report.' },
    { en: 'Agenda', id: 'Agenda / Susunan acara', cat: 'Business', example: 'What is the agenda for today\'s meeting?' },
    { en: 'Follow up', id: 'Tindak lanjut', cat: 'Business', example: 'I will follow up on this matter.' },
    { en: 'Presentation', id: 'Presentasi', cat: 'Business', example: 'She gave an excellent presentation.' },
    { en: 'Conference', id: 'Konferensi / Rapat besar', cat: 'Business', example: 'We attended an international conference.' },
    { en: 'Contract', id: 'Kontrak / Perjanjian', cat: 'Business', example: 'Sign the contract before Friday.' },
    { en: 'Approval', id: 'Persetujuan', cat: 'Business', example: 'I need your approval on this document.' },
    { en: 'Report', id: 'Laporan', cat: 'Business', example: 'Submit your weekly report by Monday.' },
    { en: 'Resign', id: 'Mengundurkan diri', cat: 'Business', example: 'He decided to resign from his position.' },
    { en: 'Promote', id: 'Mempromosikan / Naik jabatan', cat: 'Business', example: 'She was promoted to manager.' },
    { en: 'Collaborate', id: 'Berkolaborasi / Bekerja sama', cat: 'Business', example: 'Let\'s collaborate on this project.' },
    { en: 'Implement', id: 'Menerapkan / Mengimplementasikan', cat: 'Business', example: 'We will implement the new system next month.' },
    { en: 'Evaluate', id: 'Mengevaluasi', cat: 'Business', example: 'Let\'s evaluate our progress.' },
    { en: 'Efficiency', id: 'Efisiensi', cat: 'Business', example: 'We need to improve our work efficiency.' },
    { en: 'Innovation', id: 'Inovasi', cat: 'Business', example: 'Innovation is the key to success.' },
    { en: 'Opportunity', id: 'Kesempatan / Peluang', cat: 'Business', example: 'This is a great business opportunity.' },
    { en: 'Challenge', id: 'Tantangan', cat: 'Business', example: 'Every challenge is an opportunity to learn.' },
    { en: 'Sustainable', id: 'Berkelanjutan', cat: 'Business', example: 'We aim for sustainable growth.' },
    { en: 'Transparency', id: 'Transparansi', cat: 'Business', example: 'Transparency builds trust in a company.' },

    // Email / Surat Formal
    { en: 'Dear Sir/Madam,', id: 'Yang terhormat Bapak/Ibu,', cat: 'Email Formal', example: 'Salam pembuka email formal.' },
    { en: 'I am writing to inform you...', id: 'Saya menulis untuk memberitahu Anda...', cat: 'Email Formal', example: 'Kalimat pembuka email resmi.' },
    { en: 'Please find attached...', id: 'Mohon temukan terlampir...', cat: 'Email Formal', example: 'Please find attached the report you requested.' },
    { en: 'I look forward to hearing from you.', id: 'Saya berharap dapat mendengar dari Anda.', cat: 'Email Formal', example: 'Kalimat penutup email formal.' },
    { en: 'Best regards,', id: 'Salam hormat,', cat: 'Email Formal', example: 'Penutup email standar.' },
    { en: 'Sincerely,', id: 'Dengan tulus / Hormat saya,', cat: 'Email Formal', example: 'Penutup email lebih formal.' },
  ],

  // ── LEVEL 6: PROFESIONAL — Kosakata Akademik & Lanjutan ───────
  level6: [
    { en: 'Phenomenon', id: 'Fenomena', cat: 'Akademik', example: 'Climate change is a global phenomenon.' },
    { en: 'Hypothesis', id: 'Hipotesis', cat: 'Akademik', example: 'The scientist tested her hypothesis.' },
    { en: 'Analyze', id: 'Menganalisis', cat: 'Akademik', example: 'We need to analyze the data carefully.' },
    { en: 'Conclude', id: 'Menyimpulkan', cat: 'Akademik', example: 'We can conclude that the experiment succeeded.' },
    { en: 'Justify', id: 'Membenarkan / Memberikan alasan', cat: 'Akademik', example: 'Please justify your decision.' },
    { en: 'Contradict', id: 'Bertentangan / Menyangkal', cat: 'Akademik', example: 'These two facts contradict each other.' },
    { en: 'Elaborate', id: 'Menjelaskan lebih lanjut', cat: 'Akademik', example: 'Could you elaborate on that point?' },
    { en: 'Imply', id: 'Menyiratkan / Berimplikasi', cat: 'Akademik', example: 'His silence implies agreement.' },
    { en: 'Significant', id: 'Signifikan / Penting', cat: 'Akademik', example: 'There is a significant improvement in results.' },
    { en: 'Consistent', id: 'Konsisten', cat: 'Akademik', example: 'Be consistent in your effort.' },
    { en: 'Relevant', id: 'Relevan / Berkaitan', cat: 'Akademik', example: 'Your experience is very relevant for this role.' },
    { en: 'Interpret', id: 'Menafsirkan / Menginterpretasikan', cat: 'Akademik', example: 'How do you interpret this data?' },
    { en: 'Approach', id: 'Pendekatan', cat: 'Akademik', example: 'We need a new approach to solve this problem.' },
    { en: 'Framework', id: 'Kerangka kerja', cat: 'Akademik', example: 'The framework guides our research.' },
    { en: 'Perspective', id: 'Sudut pandang / Perspektif', cat: 'Akademik', example: 'Try to see it from a different perspective.' },
    { en: 'Perceive', id: 'Menganggap / Memandang', cat: 'Akademik', example: 'How do people perceive this change?' },
    { en: 'Acknowledge', id: 'Mengakui', cat: 'Akademik', example: 'I acknowledge my mistake.' },
    { en: 'Emphasize', id: 'Menekankan', cat: 'Akademik', example: 'I want to emphasize the importance of this.' },
    { en: 'Furthermore', id: 'Lebih jauh lagi / Selanjutnya', cat: 'Transisi', example: 'Furthermore, the results show positive growth.' },
    { en: 'Nevertheless', id: 'Meskipun demikian', cat: 'Transisi', example: 'The task was hard. Nevertheless, we completed it.' },
    { en: 'Consequently', id: 'Akibatnya / Konsekuensinya', cat: 'Transisi', example: 'He missed the meeting. Consequently, he missed the news.' },
    { en: 'On the contrary', id: 'Sebaliknya', cat: 'Transisi', example: 'He is not lazy. On the contrary, he works very hard.' },
    { en: 'To sum up', id: 'Singkatnya / Kesimpulannya', cat: 'Transisi', example: 'To sum up, the project was a great success.' },
    { en: 'With regard to', id: 'Berkaitan dengan / Mengenai', cat: 'Transisi', example: 'With regard to your question, I will respond shortly.' },
  ],
};

// ================================================================
// LEVEL DEFINITIONS
// ================================================================
const EN_LEVELS = [
  { id: 1, name: 'Pemula',           label: 'Level 1 — Pemula',           color: '#5de0a0', desc: 'Kosakata dasar: kata sifat, kata kerja, kata tanya, waktu' },
  { id: 2, name: 'Pemula Lanjut',    label: 'Level 2 — Pemula Lanjut',    color: '#60a5fa', desc: 'Kalimat percakapan sehari-hari & frasa di restoran' },
  { id: 3, name: 'Menengah',         label: 'Level 3 — Menengah',         color: '#a78bfa', desc: 'Irregular verb (V1/V2/V3) & pola tenses' },
  { id: 4, name: 'Menengah Atas',    label: 'Level 4 — Menengah Atas',    color: '#f7d96a', desc: 'Idiom bahasa Inggris & frasa percakapan' },
  { id: 5, name: 'Mahir',            label: 'Level 5 — Mahir',            color: '#f7b96a', desc: 'Kosakata bisnis & email formal' },
  { id: 6, name: 'Profesional',      label: 'Level 6 — Profesional',      color: '#f76a6a', desc: 'Kosakata akademik & kata transisi lanjutan' },
];

// ================================================================
// MODE LATIHAN
// ================================================================
const EN_MODES = {
  en2id:  { id: 'en2id',  label: 'English → Indo',   icon: '🇬🇧→🇮🇩', desc: 'Lihat kata/kalimat Bahasa Inggris, ketik artinya dalam Bahasa Indonesia.' },
  id2en:  { id: 'id2en',  label: 'Indo → English',   icon: '🇮🇩→🇬🇧', desc: 'Lihat kata/kalimat Bahasa Indonesia, ketik artinya dalam Bahasa Inggris.' },
  mcq:    { id: 'mcq',    label: 'Pilihan Ganda',     icon: '📋', desc: 'Pilih terjemahan yang benar dari 4 pilihan.' },
  listen: { id: 'listen', label: 'Contoh Kalimat',    icon: '📖', desc: 'Baca contoh kalimat, tebak kata yang dimaksud.' },
};

// ================================================================
// XP TABLE
// ================================================================
const EN_XP_PER_LEVEL = [0, 100, 250, 450, 700, 1000, 1400];

// ================================================================
// STATE
// ================================================================
const enState = {
  level: 1,
  mode: 'en2id',
  xp: 0,
  combo: 1,
  streak: 0,
  done: 0,
  currentQ: null,
  customWords: [],   // kata tambahan dari user
};

// ================================================================
// LOAD / SAVE CUSTOM WORDS (localStorage)
// ================================================================
function enLoadCustomWords() {
  try {
    const raw = localStorage.getItem('en_trainer_custom_words');
    if (raw) enState.customWords = JSON.parse(raw);
  } catch(e) { enState.customWords = []; }
}

function enSaveCustomWords() {
  try {
    localStorage.setItem('en_trainer_custom_words', JSON.stringify(enState.customWords));
  } catch(e) {}
}

// ================================================================
// AMBIL DATA LEVEL SAAT INI (termasuk custom words)
// ================================================================
function enGetCurrentPool() {
  const key = 'level' + enState.level;
  const base = EN_VOCAB_DB[key] || EN_VOCAB_DB.level1;
  // Tambahkan custom words yang levelnya sesuai atau tidak ada filter
  const customs = enState.customWords.filter(w => !w.level || w.level === enState.level);
  return [...base, ...customs];
}

// ================================================================
// GENERATE PERTANYAAN
// ================================================================
function enGenerateQuestion() {
  const pool = enGetCurrentPool();
  if (!pool.length) return;

  let item;
  let attempts = 0;
  do {
    item = ENRng.pick(pool);
    attempts++;
  } while (enState.currentQ && attempts < 10 &&
           enState.currentQ.en === item.en);

  enState.currentQ = item;
  const mode = enState.mode;

  if (mode === 'en2id') {
    enRenderTypingQuestion(item.en, 'Indonesia', item.id, item);
  } else if (mode === 'id2en') {
    enRenderTypingQuestion(item.id, 'English', item.en, item);
  } else if (mode === 'mcq') {
    enRenderMCQ(item, pool);
  } else if (mode === 'listen') {
    enRenderSentenceQuestion(item);
  }
}

// ── Render: Ketik Jawaban ──────────────────────────────────────
function enRenderTypingQuestion(prompt, targetLang, answer, item) {
  const area = document.getElementById('en-question-area');
  if (!area) return;

  area.innerHTML = `
    <div class="en-question-prompt">
      <div class="en-q-label">Terjemahkan ke <strong>${targetLang}</strong>:</div>
      <div class="en-q-word">${prompt}</div>
      <div class="en-q-cat">${item.cat || ''}</div>
    </div>
    <div class="en-input-wrap">
      <input id="en-answer-input" type="text"
        placeholder="Ketik jawaban di sini..."
        autocomplete="off" autocorrect="off" spellcheck="false"
        class="en-answer-input"
        onkeydown="if(event.key==='Enter') enCheckAnswer()"
      />
      <button class="en-btn-submit" onclick="enCheckAnswer()">Cek ✓</button>
    </div>
    <div class="en-hint-area" id="en-hint-area" style="display:none">
      <div class="en-hint-label">💡 Contoh Kalimat:</div>
      <div class="en-hint-text">${item.example || ''}</div>
    </div>
    <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="en-btn-mini" onclick="enToggleHint()">💡 Hint</button>
      <button class="en-btn-mini" onclick="enSkipQuestion()">⏭ Lewati</button>
    </div>
    <input type="hidden" id="en-correct-answer" value="${answer.replace(/"/g, '&quot;')}">
    <div id="en-feedback" class="en-feedback" style="display:none"></div>
  `;
  setTimeout(() => {
    const inp = document.getElementById('en-answer-input');
    if (inp) inp.focus();
  }, 100);
}

// ── Render: Pilihan Ganda ───────────────────────────────────────
function enRenderMCQ(item, pool) {
  const area = document.getElementById('en-question-area');
  if (!area) return;

  const isEN = Math.random() > 0.5;
  const questionText = isEN ? item.en : item.id;
  const correctAnswer = isEN ? item.id : item.en;

  // Ambil 3 distractors
  const others = ENRng.shuffle(pool.filter(w => w.en !== item.en));
  const distractors = others.slice(0, 3).map(w => isEN ? w.id : w.en);
  const choices = ENRng.shuffle([correctAnswer, ...distractors]);

  area.innerHTML = `
    <div class="en-question-prompt">
      <div class="en-q-label">Apa arti ${isEN ? 'Bahasa Inggris' : 'Bahasa Indonesia'} di bawah ini?</div>
      <div class="en-q-word">${questionText}</div>
      <div class="en-q-cat">${item.cat || ''}</div>
    </div>
    <div class="en-mcq-choices" id="en-mcq-choices">
      ${choices.map((c, i) => `
        <button class="en-mcq-btn" onclick="enCheckMCQ(this, '${c.replace(/'/g,"\\'")}', '${correctAnswer.replace(/'/g,"\\'")}')">
          <span class="en-mcq-idx">${['A','B','C','D'][i]}</span>
          <span>${c}</span>
        </button>
      `).join('')}
    </div>
    <div style="margin-top:14px">
      <button class="en-btn-mini" onclick="enSkipQuestion()">⏭ Lewati</button>
    </div>
    <div id="en-feedback" class="en-feedback" style="display:none"></div>
  `;
}

// ── Render: Contoh Kalimat ──────────────────────────────────────
function enRenderSentenceQuestion(item) {
  const area = document.getElementById('en-question-area');
  if (!area) return;

  // Sembunyikan satu kata kunci dalam kalimat
  const ex = item.example || item.en;
  const masked = ex.replace(new RegExp(item.en.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'i'), '______');

  area.innerHTML = `
    <div class="en-question-prompt">
      <div class="en-q-label">Lengkapi kalimat dengan kata yang tepat (Bahasa Inggris):</div>
      <div class="en-q-word" style="font-size:1.1rem">${masked}</div>
      <div class="en-q-cat">Petunjuk: ${item.id}</div>
    </div>
    <div class="en-input-wrap">
      <input id="en-answer-input" type="text"
        placeholder="Ketik kata dalam Bahasa Inggris..."
        autocomplete="off" autocorrect="off" spellcheck="false"
        class="en-answer-input"
        onkeydown="if(event.key==='Enter') enCheckAnswer()"
      />
      <button class="en-btn-submit" onclick="enCheckAnswer()">Cek ✓</button>
    </div>
    <div class="en-hint-area" id="en-hint-area" style="display:none">
      <div class="en-hint-label">🔤 Terjemahan lengkap:</div>
      <div class="en-hint-text">${item.en}</div>
    </div>
    <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="en-btn-mini" onclick="enToggleHint()">💡 Hint</button>
      <button class="en-btn-mini" onclick="enSkipQuestion()">⏭ Lewati</button>
    </div>
    <input type="hidden" id="en-correct-answer" value="${item.en.replace(/"/g, '&quot;')}">
    <div id="en-feedback" class="en-feedback" style="display:none"></div>
  `;
  setTimeout(() => {
    const inp = document.getElementById('en-answer-input');
    if (inp) inp.focus();
  }, 100);
}

// ================================================================
// CEK JAWABAN
// ================================================================
function enCheckAnswer() {
  const inp = document.getElementById('en-answer-input');
  if (!inp) return;
  const userAns = inp.value.trim();
  const correct = document.getElementById('en-correct-answer')?.value || '';

  // Normalize: lowercase, strip punctuation untuk perbandingan
  const norm = s => s.toLowerCase().replace(/[^\w\s]/g, '').trim();

  // Cek benar: exact match ATAU kata kunci utama ada
  const isCorrect = norm(userAns) === norm(correct) ||
    norm(correct).split('/').map(p=>p.trim()).some(p => norm(userAns) === p) ||
    (norm(correct).length > 4 && norm(userAns).length > 3 &&
     norm(correct).includes(norm(userAns)) && norm(userAns).length >= norm(correct).length * 0.6);

  if (isCorrect) {
    enHandleCorrect();
  } else {
    enHandleWrong(correct);
  }
}

function enCheckMCQ(btn, selected, correct) {
  const allBtns = document.querySelectorAll('.en-mcq-btn');
  allBtns.forEach(b => b.disabled = true);

  const isCorrect = selected === correct;

  if (isCorrect) {
    btn.classList.add('en-mcq-correct');
    enHandleCorrect();
  } else {
    btn.classList.add('en-mcq-wrong');
    // Tunjukkan jawaban benar
    allBtns.forEach(b => {
      if (b.querySelector('span:last-child').textContent === correct) {
        b.classList.add('en-mcq-correct');
      }
    });
    enHandleWrong(correct, true);
  }
}

// ================================================================
// HANDLE BENAR / SALAH
// ================================================================
function enHandleCorrect() {
  enState.combo = Math.min(enState.combo + 1, 8);
  enState.streak++;
  enState.done++;

  const baseXP = 10 + (enState.level - 1) * 5;
  const xpEarned = baseXP * enState.combo;
  enState.xp += xpEarned;

  enUpdateComboStreak();
  enUpdateXPBar();

  const fb = document.getElementById('en-feedback');
  if (fb) {
    fb.style.display = 'block';
    fb.className = 'en-feedback en-feedback-correct';
    fb.innerHTML = `✅ Benar! <strong>+${xpEarned} XP</strong> · Combo x${enState.combo}
      ${enState.currentQ?.example ? `<div class="en-fb-example">📖 ${enState.currentQ.example}</div>` : ''}`;
  }

  // Disable input
  const inp = document.getElementById('en-answer-input');
  if (inp) inp.disabled = true;
  const btn = document.querySelector('.en-btn-submit');
  if (btn) btn.disabled = true;

  // Auto next
  setTimeout(() => enGenerateQuestion(), 2200);

  if (typeof showToast === 'function') showToast('✅', `Benar! +${xpEarned} XP · Combo x${enState.combo}`);
}

function enHandleWrong(correct, isMCQ = false) {
  enState.combo = 1;
  enState.streak = 0;
  enUpdateComboStreak();

  const fb = document.getElementById('en-feedback');
  if (fb) {
    fb.style.display = 'block';
    fb.className = 'en-feedback en-feedback-wrong';
    fb.innerHTML = `❌ Kurang tepat. Jawaban: <strong>${correct}</strong>
      ${enState.currentQ?.example ? `<div class="en-fb-example">📖 ${enState.currentQ.example}</div>` : ''}`;
  }

  if (!isMCQ) {
    const inp = document.getElementById('en-answer-input');
    if (inp) { inp.disabled = true; }
    const btn = document.querySelector('.en-btn-submit');
    if (btn) btn.disabled = true;
  }

  setTimeout(() => enGenerateQuestion(), 2500);
  if (typeof showToast === 'function') showToast('❌', 'Kurang tepat!');
}

function enSkipQuestion() {
  enState.combo = 1;
  enUpdateComboStreak();
  enGenerateQuestion();
}

// ================================================================
// TOGGLE HINT
// ================================================================
function enToggleHint() {
  const area = document.getElementById('en-hint-area');
  if (!area) return;
  area.style.display = area.style.display === 'none' ? 'block' : 'none';
}

// ================================================================
// XP & RANK
// ================================================================
function enGetRank(xp) {
  if (xp < 100)  return '🌱 Pemula';
  if (xp < 300)  return '📘 Dasar';
  if (xp < 600)  return '⭐ Berkembang';
  if (xp < 1000) return '🔥 Menengah';
  if (xp < 1500) return '💎 Mahir';
  if (xp < 2200) return '🚀 Lanjutan';
  return '👑 Profesional';
}

function enUpdateXPBar() {
  const xpEl = document.getElementById('en-xp-display');
  if (xpEl) xpEl.textContent = enState.xp;
  const rankEl = document.getElementById('en-rank-label');
  if (rankEl) rankEl.textContent = enGetRank(enState.xp);
  const levelXpMin = EN_XP_PER_LEVEL[enState.level - 1] || 0;
  const levelXpMax = EN_XP_PER_LEVEL[enState.level] || 2000;
  const pct = Math.min(Math.round(((enState.xp - levelXpMin) / (levelXpMax - levelXpMin)) * 100), 100);
  const bar = document.getElementById('en-xp-bar');
  if (bar) bar.style.width = pct + '%';
  const barPct = document.getElementById('en-xp-bar-pct');
  if (barPct) barPct.textContent = pct + '%';
}

function enUpdateComboStreak() {
  const combo = document.getElementById('en-combo-display');
  if (combo) combo.textContent = 'x' + enState.combo;
  const streak = document.getElementById('en-streak-display');
  if (streak) streak.textContent = enState.streak;
  const done = document.getElementById('en-done-display');
  if (done) done.textContent = enState.done;
}

// ================================================================
// MODAL LEVEL
// ================================================================
function enOpenLevelModal() {
  const modal = document.getElementById('en-level-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  const list = document.getElementById('en-level-list');
  list.innerHTML = '';
  EN_LEVELS.forEach(lv => {
    const btn = document.createElement('button');
    btn.className = 'en-modal-item' + (enState.level === lv.id ? ' active' : '');
    btn.style.borderLeftColor = lv.color;
    btn.innerHTML = `
      <span class="en-modal-dot" style="background:${lv.color}"></span>
      <div>
        <div class="en-modal-title">${lv.label}</div>
        <div class="en-modal-desc">${lv.desc}</div>
      </div>
    `;
    btn.onclick = () => {
      enState.level = lv.id;
      const lblEl = document.getElementById('en-level-btn-label');
      if (lblEl) lblEl.textContent = lv.label;
      modal.style.display = 'none';
      enGenerateQuestion();
    };
    list.appendChild(btn);
  });
}
function enCloseLevelModal() {
  const m = document.getElementById('en-level-modal');
  if (m) m.style.display = 'none';
}

// ================================================================
// MODAL MODE
// ================================================================
function enOpenModeModal() {
  const modal = document.getElementById('en-mode-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  const list = document.getElementById('en-mode-list');
  list.innerHTML = '';
  Object.values(EN_MODES).forEach(mode => {
    const btn = document.createElement('button');
    btn.className = 'en-modal-item' + (enState.mode === mode.id ? ' active' : '');
    btn.innerHTML = `
      <span style="font-size:24px">${mode.icon}</span>
      <div>
        <div class="en-modal-title">${mode.label}</div>
        <div class="en-modal-desc">${mode.desc}</div>
      </div>
    `;
    btn.onclick = () => {
      enState.mode = mode.id;
      const lblEl = document.getElementById('en-mode-btn-label');
      if (lblEl) lblEl.textContent = mode.icon + ' ' + mode.label;
      modal.style.display = 'none';
      enGenerateQuestion();
    };
    list.appendChild(btn);
  });
}
function enCloseModeModal() {
  const m = document.getElementById('en-mode-modal');
  if (m) m.style.display = 'none';
}

// ================================================================
// MODAL TAMBAH KATA
// ================================================================
function enOpenAddWordModal() {
  const modal = document.getElementById('en-addword-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  enRenderCustomWordList();
}
function enCloseAddWordModal() {
  const m = document.getElementById('en-addword-modal');
  if (m) m.style.display = 'none';
}

function enSaveNewWord() {
  const enWord = document.getElementById('en-new-en')?.value.trim();
  const idWord = document.getElementById('en-new-id')?.value.trim();
  const catWord = document.getElementById('en-new-cat')?.value.trim() || 'Custom';
  const exWord = document.getElementById('en-new-ex')?.value.trim() || '';

  if (!enWord || !idWord) {
    alert('Mohon isi kata Bahasa Inggris dan terjemahannya!');
    return;
  }

  // Cek duplikat
  const allWords = Object.values(EN_VOCAB_DB).flat().concat(enState.customWords);
  if (allWords.some(w => w.en.toLowerCase() === enWord.toLowerCase())) {
    alert('Kata "' + enWord + '" sudah ada di database!');
    return;
  }

  const newWord = {
    en: enWord,
    id: idWord,
    cat: catWord,
    example: exWord,
    level: enState.level,
    isCustom: true,
  };

  enState.customWords.push(newWord);
  enSaveCustomWords();

  // Reset form
  ['en-new-en','en-new-id','en-new-cat','en-new-ex'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  enRenderCustomWordList();

  // Feedback
  const msg = document.getElementById('en-addword-msg');
  if (msg) {
    msg.textContent = `✅ Kata "${enWord}" berhasil ditambahkan!`;
    setTimeout(() => { msg.textContent = ''; }, 3000);
  }
}

function enDeleteCustomWord(idx) {
  enState.customWords.splice(idx, 1);
  enSaveCustomWords();
  enRenderCustomWordList();
}

function enRenderCustomWordList() {
  const list = document.getElementById('en-custom-word-list');
  if (!list) return;
  if (enState.customWords.length === 0) {
    list.innerHTML = '<div style="color:var(--text3);font-size:13px;text-align:center;padding:12px">Belum ada kata yang ditambahkan.</div>';
    return;
  }
  list.innerHTML = enState.customWords.map((w, i) => `
    <div class="en-custom-word-item">
      <div>
        <span class="en-cw-en">${w.en}</span>
        <span class="en-cw-sep">→</span>
        <span class="en-cw-id">${w.id}</span>
        <span class="en-cw-cat">[${w.cat}]</span>
      </div>
      <button class="en-cw-del" onclick="enDeleteCustomWord(${i})" title="Hapus">✕</button>
    </div>
  `).join('');
}

// ================================================================
// RENDER HALAMAN UTAMA ENGLISH TRAINER
// ================================================================
function enRenderPage() {
  const page = document.getElementById('page-entrainer');
  if (!page) return;

  page.innerHTML = `
  <style>
    /* ─── English Trainer Styles ─── */
    .en-trainer-wrap {
      max-width: 700px;
      margin: 0 auto;
      padding: 0 12px 60px;
      font-family: var(--font-ui, 'Segoe UI', sans-serif);
    }
    .en-header {
      text-align: center;
      padding: 24px 0 16px;
    }
    .en-header h1 {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--text1, #fff);
      margin: 0 0 4px;
    }
    .en-header p {
      font-size: 13px;
      color: var(--text3, #888);
      margin: 0;
    }
    /* Stats bar */
    .en-stats-bar {
      display: flex;
      gap: 10px;
      margin: 14px 0;
      flex-wrap: wrap;
    }
    .en-stat-box {
      flex: 1;
      min-width: 80px;
      background: var(--bg2, #1e1e2e);
      border: 1px solid var(--border, #2a2a3e);
      border-radius: 12px;
      padding: 10px 8px;
      text-align: center;
    }
    .en-stat-val {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--accent, #7c6af7);
    }
    .en-stat-label {
      font-size: 10px;
      color: var(--text3, #888);
      margin-top: 2px;
    }
    /* XP bar */
    .en-xp-section {
      background: var(--bg2, #1e1e2e);
      border: 1px solid var(--border, #2a2a3e);
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 14px;
    }
    .en-xp-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .en-xp-label { font-size: 12px; color: var(--text2, #bbb); }
    .en-rank-label { font-size: 12px; font-weight: 700; color: var(--accent, #7c6af7); }
    .en-xp-bar-bg {
      height: 8px;
      background: var(--bg3, #2a2a3e);
      border-radius: 99px;
      overflow: hidden;
    }
    .en-xp-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #7c6af7, #a78bfa);
      border-radius: 99px;
      transition: width .4s ease;
      width: 0%;
    }
    .en-xp-pct { font-size: 10px; color: var(--text3, #777); text-align: right; margin-top: 3px; }
    /* Control buttons */
    .en-controls {
      display: flex;
      gap: 8px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }
    .en-ctrl-btn {
      flex: 1;
      min-width: 120px;
      padding: 9px 12px;
      background: var(--bg2, #1e1e2e);
      border: 1px solid var(--border, #2a2a3e);
      border-radius: 10px;
      color: var(--text2, #ccc);
      font-size: 12px;
      cursor: pointer;
      transition: all .2s;
      white-space: nowrap;
    }
    .en-ctrl-btn:hover { background: var(--bg3, #2a2a3e); color: var(--text1, #fff); }
    .en-ctrl-btn.accent { background: rgba(124,106,247,.15); border-color: rgba(124,106,247,.4); color: var(--accent, #7c6af7); }
    /* Question area */
    .en-question-area {
      background: var(--bg2, #1e1e2e);
      border: 1px solid var(--border, #2a2a3e);
      border-radius: 16px;
      padding: 20px;
      min-height: 200px;
    }
    .en-q-label {
      font-size: 12px;
      color: var(--text3, #888);
      margin-bottom: 8px;
    }
    .en-q-word {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text1, #fff);
      margin-bottom: 6px;
      line-height: 1.3;
    }
    .en-q-cat {
      display: inline-block;
      font-size: 11px;
      color: var(--accent, #7c6af7);
      background: rgba(124,106,247,.12);
      padding: 3px 8px;
      border-radius: 99px;
      margin-bottom: 16px;
    }
    /* Input wrap */
    .en-input-wrap {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
    }
    .en-answer-input {
      flex: 1;
      background: var(--bg3, #2a2a3e);
      border: 1px solid var(--border, #3a3a5e);
      border-radius: 10px;
      color: var(--text1, #fff);
      font-size: 15px;
      padding: 10px 14px;
      outline: none;
      transition: border .2s;
    }
    .en-answer-input:focus { border-color: var(--accent, #7c6af7); }
    .en-btn-submit {
      padding: 10px 18px;
      background: var(--accent, #7c6af7);
      color: #fff;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
      transition: opacity .2s;
    }
    .en-btn-submit:hover { opacity: .85; }
    .en-btn-submit:disabled { opacity: .4; }
    /* MCQ */
    .en-mcq-choices {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 12px;
    }
    @media (max-width: 480px) { .en-mcq-choices { grid-template-columns: 1fr; } }
    .en-mcq-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg3, #2a2a3e);
      border: 1px solid var(--border, #3a3a5e);
      border-radius: 12px;
      color: var(--text1, #fff);
      padding: 12px 14px;
      font-size: 13px;
      cursor: pointer;
      text-align: left;
      transition: all .2s;
    }
    .en-mcq-btn:hover:not(:disabled) { border-color: var(--accent, #7c6af7); background: rgba(124,106,247,.08); }
    .en-mcq-btn.en-mcq-correct { background: rgba(93,224,160,.15); border-color: #5de0a0; color: #5de0a0; }
    .en-mcq-btn.en-mcq-wrong { background: rgba(247,106,106,.12); border-color: #f76a6a; color: #f76a6a; }
    .en-mcq-idx {
      width: 24px; height: 24px;
      border-radius: 50%;
      background: rgba(255,255,255,.06);
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700; flex-shrink: 0;
    }
    /* Mini buttons */
    .en-btn-mini {
      padding: 6px 12px;
      background: var(--bg3, #2a2a3e);
      border: 1px solid var(--border, #3a3a5e);
      border-radius: 8px;
      color: var(--text2, #bbb);
      font-size: 12px;
      cursor: pointer;
      transition: all .2s;
    }
    .en-btn-mini:hover { color: var(--text1, #fff); }
    /* Hint area */
    .en-hint-area {
      background: rgba(247,217,106,.07);
      border: 1px solid rgba(247,217,106,.2);
      border-radius: 10px;
      padding: 10px 14px;
      margin-top: 10px;
    }
    .en-hint-label { font-size: 11px; color: #f7d96a; margin-bottom: 4px; }
    .en-hint-text { font-size: 13px; color: var(--text2, #ccc); }
    /* Feedback */
    .en-feedback {
      margin-top: 14px;
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
    }
    .en-feedback-correct {
      background: rgba(93,224,160,.12);
      border: 1px solid rgba(93,224,160,.3);
      color: #5de0a0;
    }
    .en-feedback-wrong {
      background: rgba(247,106,106,.1);
      border: 1px solid rgba(247,106,106,.25);
      color: #f76a6a;
    }
    .en-fb-example {
      margin-top: 6px;
      font-size: 12px;
      font-weight: 400;
      color: var(--text2, #ccc);
    }
    /* ── Modals ── */
    .en-modal-overlay {
      display: none;
      position: fixed; inset: 0;
      background: rgba(0,0,0,.7);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .en-modal-box {
      background: var(--bg2, #1a1a2e);
      border: 1px solid var(--border, #2a2a3e);
      border-radius: 20px;
      padding: 24px;
      width: 100%;
      max-width: 480px;
      max-height: 85vh;
      overflow-y: auto;
    }
    .en-modal-title-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .en-modal-h { font-size: 1.1rem; font-weight: 800; color: var(--text1, #fff); }
    .en-modal-close {
      width: 30px; height: 30px;
      background: var(--bg3, #2a2a3e);
      border: none; border-radius: 50%;
      color: var(--text2, #ccc);
      cursor: pointer; font-size: 14px;
      display: flex; align-items: center; justify-content: center;
    }
    .en-modal-list { display: flex; flex-direction: column; gap: 8px; }
    .en-modal-item {
      display: flex; gap: 12px; align-items: flex-start;
      background: var(--bg3, #2a2a3e);
      border: 1px solid var(--border, #3a3a5e);
      border-left: 3px solid transparent;
      border-radius: 12px;
      padding: 12px 14px;
      cursor: pointer;
      text-align: left;
      transition: all .2s;
      color: var(--text2, #ccc);
    }
    .en-modal-item:hover { border-color: var(--accent, #7c6af7) !important; }
    .en-modal-item.active { background: rgba(124,106,247,.1); border-left-color: var(--accent, #7c6af7) !important; color: var(--accent, #7c6af7); }
    .en-modal-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; margin-top: 2px; }
    .en-modal-title { font-weight: 700; font-size: 13px; }
    .en-modal-desc { font-size: 11px; color: var(--text3, #888); margin-top: 2px; line-height: 1.4; }
    /* Add word form */
    .en-form-group { margin-bottom: 12px; }
    .en-form-label { font-size: 12px; color: var(--text2, #bbb); margin-bottom: 5px; display: block; }
    .en-form-input {
      width: 100%;
      background: var(--bg3, #2a2a3e);
      border: 1px solid var(--border, #3a3a5e);
      border-radius: 8px;
      color: var(--text1, #fff);
      font-size: 14px;
      padding: 9px 12px;
      outline: none;
      box-sizing: border-box;
    }
    .en-form-input:focus { border-color: var(--accent, #7c6af7); }
    .en-btn-save {
      width: 100%;
      padding: 12px;
      background: var(--accent, #7c6af7);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      margin-bottom: 14px;
    }
    .en-btn-save:hover { opacity: .85; }
    .en-custom-word-list { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; }
    .en-custom-word-item {
      display: flex; justify-content: space-between; align-items: center;
      background: var(--bg3, #2a2a3e);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
    }
    .en-cw-en { color: #60a5fa; font-weight: 600; }
    .en-cw-sep { color: var(--text3, #777); margin: 0 6px; }
    .en-cw-id { color: var(--text1, #eee); }
    .en-cw-cat { color: var(--text3, #777); font-size: 11px; margin-left: 6px; }
    .en-cw-del {
      background: none; border: none;
      color: #f76a6a; cursor: pointer; font-size: 14px;
      padding: 2px 6px; border-radius: 4px;
    }
    .en-cw-del:hover { background: rgba(247,106,106,.12); }
    .en-addword-msg { font-size: 13px; color: #5de0a0; min-height: 20px; text-align: center; }
    /* Word counter */
    .en-word-count {
      font-size: 11px; color: var(--text3, #888); text-align: center;
      margin-top: 12px;
    }
  </style>

  <div class="en-trainer-wrap">
    <!-- Header -->
    <div class="en-header">
      <h1>🇬🇧 English Trainer</h1>
      <p>Belajar kosakata & percakapan Bahasa Inggris dari pemula hingga profesional</p>
    </div>

    <!-- XP Bar -->
    <div class="en-xp-section">
      <div class="en-xp-top">
        <span class="en-xp-label">XP: <strong id="en-xp-display">0</strong></span>
        <span class="en-rank-label" id="en-rank-label">🌱 Pemula</span>
      </div>
      <div class="en-xp-bar-bg">
        <div class="en-xp-bar-fill" id="en-xp-bar"></div>
      </div>
      <div class="en-xp-pct" id="en-xp-bar-pct">0%</div>
    </div>

    <!-- Stats -->
    <div class="en-stats-bar">
      <div class="en-stat-box">
        <div class="en-stat-val" id="en-combo-display">x1</div>
        <div class="en-stat-label">Combo</div>
      </div>
      <div class="en-stat-box">
        <div class="en-stat-val" id="en-streak-display">0</div>
        <div class="en-stat-label">Streak</div>
      </div>
      <div class="en-stat-box">
        <div class="en-stat-val" id="en-done-display">0</div>
        <div class="en-stat-label">Dijawab</div>
      </div>
    </div>

    <!-- Controls -->
    <div class="en-controls">
      <button class="en-ctrl-btn accent" onclick="enOpenLevelModal()">
        📊 <span id="en-level-btn-label">Level 1 — Pemula</span>
      </button>
      <button class="en-ctrl-btn" onclick="enOpenModeModal()">
        ⚙️ <span id="en-mode-btn-label">🇬🇧→🇮🇩 English → Indo</span>
      </button>
      <button class="en-ctrl-btn" onclick="enOpenAddWordModal()">
        ➕ Tambah Kata
      </button>
    </div>

    <!-- Question Area -->
    <div class="en-question-area" id="en-question-area">
      <div style="text-align:center;color:var(--text3);padding:40px 0">
        ⏳ Memuat pertanyaan...
      </div>
    </div>

    <!-- Word count info -->
    <div class="en-word-count" id="en-word-count-info"></div>
  </div>

  <!-- ── Modal: Pilih Level ── -->
  <div class="en-modal-overlay" id="en-level-modal" onclick="if(event.target===this)enCloseLevelModal()">
    <div class="en-modal-box">
      <div class="en-modal-title-bar">
        <div class="en-modal-h">📊 Pilih Level</div>
        <button class="en-modal-close" onclick="enCloseLevelModal()">✕</button>
      </div>
      <div class="en-modal-list" id="en-level-list"></div>
    </div>
  </div>

  <!-- ── Modal: Pilih Mode ── -->
  <div class="en-modal-overlay" id="en-mode-modal" onclick="if(event.target===this)enCloseModeModal()">
    <div class="en-modal-box">
      <div class="en-modal-title-bar">
        <div class="en-modal-h">⚙️ Pilih Mode Latihan</div>
        <button class="en-modal-close" onclick="enCloseModeModal()">✕</button>
      </div>
      <div class="en-modal-list" id="en-mode-list"></div>
    </div>
  </div>

  <!-- ── Modal: Tambah Kata ── -->
  <div class="en-modal-overlay" id="en-addword-modal" onclick="if(event.target===this)enCloseAddWordModal()">
    <div class="en-modal-box">
      <div class="en-modal-title-bar">
        <div class="en-modal-h">➕ Tambah Kata Baru</div>
        <button class="en-modal-close" onclick="enCloseAddWordModal()">✕</button>
      </div>
      <div class="en-form-group">
        <label class="en-form-label">Kata / Frasa Bahasa Inggris *</label>
        <input class="en-form-input" id="en-new-en" type="text" placeholder="Contoh: Perseverance">
      </div>
      <div class="en-form-group">
        <label class="en-form-label">Arti dalam Bahasa Indonesia *</label>
        <input class="en-form-input" id="en-new-id" type="text" placeholder="Contoh: Ketekunan / Kegigihan">
      </div>
      <div class="en-form-group">
        <label class="en-form-label">Kategori</label>
        <input class="en-form-input" id="en-new-cat" type="text" placeholder="Contoh: Kata Sifat, Bisnis, dll.">
      </div>
      <div class="en-form-group">
        <label class="en-form-label">Contoh Kalimat (opsional)</label>
        <input class="en-form-input" id="en-new-ex" type="text" placeholder="Contoh: Perseverance is the key to success.">
      </div>
      <button class="en-btn-save" onclick="enSaveNewWord()">💾 Simpan Kata</button>
      <div class="en-addword-msg" id="en-addword-msg"></div>
      <div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px">
        Kata yang sudah ditambahkan (<span id="en-custom-count">0</span>):
      </div>
      <div class="en-custom-word-list" id="en-custom-word-list"></div>
    </div>
  </div>
  `;
}

// ================================================================
// UPDATE WORD COUNT INFO
// ================================================================
function enUpdateWordCountInfo() {
  const pool = enGetCurrentPool();
  const info = document.getElementById('en-word-count-info');
  if (info) {
    info.textContent = `📚 ${pool.length} kata tersedia di Level ${enState.level} (termasuk ${enState.customWords.length} kata custom)`;
  }
  const cc = document.getElementById('en-custom-count');
  if (cc) cc.textContent = enState.customWords.length;
}

// ================================================================
// INIT ENGLISH TRAINER
// ================================================================
function enInitTrainer() {
  enLoadCustomWords();
  enRenderPage();

  // Small delay to ensure DOM is ready
  setTimeout(() => {
    enState.xp = parseInt(localStorage.getItem('en_trainer_xp') || '0');
    enState.combo = 1;
    enState.streak = 0;
    enState.done = 0;
    enUpdateXPBar();
    enUpdateComboStreak();
    enGenerateQuestion();
    enUpdateWordCountInfo();
  }, 50);
}

// Auto-save XP
setInterval(() => {
  localStorage.setItem('en_trainer_xp', enState.xp);
}, 5000);

// ================================================================
// HOOK INTO NAVIGATION (sama seperti pola python-trainer.js)
// ================================================================
const _origNavEN = typeof navigate === 'function' ? navigate : null;
if (_origNavEN) {
  window.navigate = function(page) {
    _origNavEN(page);
    if (page === 'entrainer') {
      setTimeout(() => {
        if (!document.getElementById('en-question-area')?.children.length ||
            document.getElementById('en-question-area').children[0]?.style.textAlign === 'center') {
          enInitTrainer();
        }
      }, 100);
    }
  };
} else {
  window.addEventListener('load', () => {
    const p = document.getElementById('page-entrainer');
    if (p && p.classList.contains('active')) enInitTrainer();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[onclick*="entrainer"]').forEach(el => {
    el.addEventListener('click', () => setTimeout(() => {
      if (!document.getElementById('en-question-area')) enInitTrainer();
    }, 150));
  });
});
