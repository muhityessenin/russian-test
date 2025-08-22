"use client"

import React, {useEffect} from "react"

import { useState } from "react"
import { Play, BookOpen, Languages, PenTool, CheckCircle, Star, Phone, Trophy, Award, Volume2, Repeat, MoveLeft, PlayCircle, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import CustomVideoPlayer from "@/components/CustomVideoPlayer"

// Типы данных
interface Question {
  id: number
  type: "video" | "grammar" | "translation" | "listening" | "image" | "translation_construct" // ДОБАВЬТЕ ЭТОТ ТИП
  question: string
  media?: {
    type: "video" | "audio" | "image"
    url: string
  }
  options: string[]
  correctAnswer: number | string
}

interface TestSection {
  id: string
  title: string
  icon: any
  questions: Question[]
}

// Функция для форматирования номера телефона
/*const formatPhoneNumber = (value: string): string => {
  // Удаляем все символы кроме цифр
  const numbers = value.replace(/\D/g, "")

  // Если номер начинается с 8, заменяем на 7
  let formattedNumbers = numbers
  if (numbers.startsWith("8")) {
    formattedNumbers = "7" + numbers.slice(1)
  }

  // Если номер не начинается с 7, добавляем 7
  if (!formattedNumbers.startsWith("7")) {
    formattedNumbers = "7" + formattedNumbers
  }

  // Ограничиваем до 11 цифр (7 + 10 цифр номера)
  formattedNumbers = formattedNumbers.slice(0, 11)

  // Форматируем номер
  if (formattedNumbers.length >= 1) {
    let formatted = "+7"
    if (formattedNumbers.length > 1) {
      formatted += " " + formattedNumbers.slice(1, 4)
    }
    if (formattedNumbers.length > 4) {
      formatted += " " + formattedNumbers.slice(4, 7)
    }
    if (formattedNumbers.length > 7) {
      formatted += " " + formattedNumbers.slice(7, 9)
    }
    if (formattedNumbers.length > 9) {
      formatted += " " + formattedNumbers.slice(9, 11)
    }
    return formatted
  }

  return "+7 "
}*/

// Функция для валидации казахстанского номера
/*const validatePhoneNumber = (phone: string): boolean => {
  // Удаляем все символы кроме цифр
  const numbers = phone.replace(/\D/g, "")

  // Проверяем что номер начинается с 7 и содержит 11 цифр
  if (!numbers.startsWith("7") || numbers.length !== 11) {
    return false
  }

  // Проверяем что код оператора корректный (второй и третий символы)
  const operatorCode = numbers.slice(1, 4)
  const validCodes = [
    // Kcell / Activ
    "700",
    "701",
    "702",
    "775",
    "776",
    "777",

    // Beeline (Кар-Тел)
    "705",
    "707",
    "747",
    "771",

    // Tele2 / Altel (Мобайл Телеком-Сервис)
    "704",
    "706",
    "708",

    // Транстелеком, Astel и прочие альтернативные
    "709",
    "710",
    "711",
    "712",
    "713",
    "714",
    "715",
    "716",
    "717",
    "718",
    "719",

    // Зарезервированные / редкие
    "778",
    "779",
    "730",
    "731",
    "732",
    "733",
    "734",
    "735",
    "736",
    "737",
    "738",
    "739",
  ]

  return validCodes.includes(operatorCode)
}*/

const testSections: TestSection[] = [
  {

    id: "video_motivation",
    title: "Видео сұрақтар",
    icon: Play,
    questions: [
      {
        id: 1,
        type: "video",
        question: "Панда не айтқысы кеп тұр?",
        media: {
          type: "video",
          url: "/IMG_1088.mp4",
        },
        options: [
          "Өткенді ұмытпауды",
          "Өткенді жіберіп, қазіргі таңдауды",
          "Өзін кінәлауді",
          "Басқа адамға сенуді"
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        type: "video",
        question: "Аспаз не кеңес берді?",
        media: {
          type: "video",
          url: "/IMG_1089.mp4", // Рататуй
        },
        options: [
          "Қателік жасамауға",
          "Үнемі ережені сақтауға",
          "Тәуекелге барып, тәжірибе жасауға",
          "Өзгелерге тәуелді болуға"
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        type: "video",
        question: "Кейіпкердің көңіл күйі?",
        media: {
          type: "video",
          url: "/IMG_1091.mp4", // Король Лев
        },
        options: [
          "Қуаныш",
          "Ашулану",
          "Қабылдау мен мұң",
          "Көңілділік"
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        type: "video",
        question: "Диалог қайда болып жатыр?",
        media: {
          type: "video",
          url: "/IMG_1092.mp4", // 1+1
        },
        options: [
          "Кинотеатрға кіреберіс",
          "Кафе ішіне кіреберіс",
          "Қоғамдық ғимаратта",
          "Аурухана қабылдау бөлімі"
        ],
        correctAnswer: 2,
      }
,
      {
        id: 5,
        type: "video",
        question: "Кейіпкер шынында не жасады?",
        media: {
          type: "video",
          url: "/IMG_1093.mp4", // Иллюзия обмана
        },
        options: [
          "Мақтады",
          "Рахмет айтты",
          "Алдап кетті",
          "Ұрлық жасады"
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "grammar",
    title: "Грамматика",
    icon: BookOpen,
    questions: [
      {
        id: 6,
        type: "grammar",
        question: "Выберите правильную форму глагола: Я _____ в магазин.",
        options: ["иду", "идёт", "идём", "идут"],
        correctAnswer: 0,
      },
      {
        id: 7,
        type: "grammar",
        question: 'Какой падеж у слова "книгу" в предложении "Я читаю книгу"?',
        options: ["Именительный", "Родительный", "Винительный", "Дательный"],
        correctAnswer: 2,
      },
      {
        id: 8,
        type: "grammar",
        question: "Укажите правильное местоимение: _____ идёт в школу.",
        options: ["Я", "Ты", "Он", "Мы"],
        correctAnswer: 2, // Он идёт
      },
      {
        id: 9,
        type: "grammar",
        question: "Как правильно: У меня _____ книга.",
        options: ["есть", "есть ли", "был", "будет"],
        correctAnswer: 0, // есть
      },
      {
        id: 10,
        type: "grammar",
        question: "Какой предлог нужен: Я говорю _____ друге.",
        options: ["о", "в", "на", "с"],
        correctAnswer: 0, // о
      },
    ],
  },

  {
    id: "translation",
    title: "Фото",
    icon: Languages,
    questions: [
      {
        id: 11,
        type: "image",
        question: "Суретте не бейнеленген?",
        media: {
          type: "image",
          url: "/IMG_8787.JPG",
        },
        options: [
          "Хлеб",
          "Молоко",
          "Сыр",
          "Список"
        ],
        correctAnswer: 3
      },
      {
        id: 12,
        type: "image",
        question: "Бұл адамға не қажет?",
        media: {
          type: "image",
          url: "/IMG_8788.JPG",
        },
        options: [
          "Косметика",
          "Одежда",
          "Бассейн",
          "Демалу" // ✅ правильный вариант — «Отдых» по-казахски
        ],
        correctAnswer: 3
      }
      ,
      {
        id: 13,
        type: "image",
        question: "Бұл адамға не қажет?",
        media: {
          type: "image",
          url: "/IMG_8789.JPG",
        },
        options: [
          "Злость",
          "Боль",
          "Надежда",
          "Страх"// ✅ правильный ответ — ведь он держит свет среди негатива
        ],
        correctAnswer: 2
      }
      ,
      {
        id: 14,
        type: "image",
        question: "Суретте не бейнеленген?",
        media: {
          type: "image",
          url: "/IMG_2127.JPG",
        },
        options: [
          "Новый жыл",
          "Жаңа жылдық тост", // ✅ правильный ответ
          "Жасыл бокал",
          "Аяз Ата"
        ],
        correctAnswer: 1
      }
      ,
      {
        id: 15,
        type: "image",
        question: "Суретте қандай сөз жетіспейді?",
        media: {
          type: "image",
          url: "/IMG_8790.JPG",
        },
        options: [
          "полными",
          "пустыми",
          "красивыми",
          "длинными"
        ],
        correctAnswer: 1
      },
    ],
  },
// ЗАМЕНИТЕ СТАРУЮ СЕКЦИЮ "writing" НА ЭТУ:
  {
    id: "listening",
    title: "Тыңдалым", // Аудирование
    icon: Volume2,
    questions: [
      {
        id: 16,
        type: "listening",
        question: "Что было сказано?",
        media: {
          type: "audio",
          url: "/L1.m4a",
        },
        options: [
          "Расписание", "работы", "скоро", "изменится", "уже", "библиотеки"
        ],
        correctAnswer: "Расписание работы скоро изменится",
      },
      {
        id: 17,
        type: "listening",
        question: "Что было предложено?",
        media: {
          type: "audio",
          url: "/L2.m4a",
        },
        options: [
          "Проект", "должен", "быть", "завершён", "немедленно", "отменён"
        ],
        correctAnswer: "Проект должен быть завершён",
      },
      {
        id: 18,
        type: "listening",
        question: "Что было сказано?",
        media: {
          type: "audio",
          url: "/L3.m4a",
        },
        options: [
          "Эту", "проблему", "нужно", "изучить", "позже", "быстро"
        ],
        correctAnswer: "Эту проблему нужно изучить",
      },
      {
        id: 19,
        type: "listening",
        question: "Что сказал клиент?",
        media: {
          type: "audio",
          url: "/L4.m4a",
        },
        options: [
          "Заказ", "был", "оформлен", "неверно", "правильно", "вчера"
        ],
        correctAnswer: "Заказ был оформлен неверно",
      },
      {
        id: 20,
        type: "listening",
        question: "О чём шла речь?",
        media: {
          type: "audio",
          url: "/L5.m4a",
        },
        options: [
          "Изменения", "в", "контракте", "одобрены", "отменены", "заменены"
        ],
        correctAnswer: "Изменения в контракте одобрены",
      },
    ],
  },
]

export default function RussianTest() {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
//  const [phoneNumber, setPhoneNumber] = useState("+7 ")
//  const [isPhoneValid, setIsPhoneValid] = useState(false)
//  const [showPhoneRequest, setShowPhoneRequest] = useState(false)
//  const [isSubmitting, setIsSubmitting] = useState(false)
//  const [submitError, setSubmitError] = useState("")
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [bonusModalClosedCount, setBonusModalClosedCount] = useState(0);

  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [wordBank, setWordBank] = useState<string[]>([])
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(true);
  const [initialWordBankOrder, setInitialWordBankOrder] = useState<string[]>([])

  useEffect(() => {
    const currentQ = testSections[currentSection]?.questions[currentQuestion]
    if (currentQ?.type === "listening") {
      setSelectedWords([])
      const shuffledOptions = currentQ.options.sort(() => Math.random() - 0.5);
      setInitialWordBankOrder(shuffledOptions);
      setWordBank(shuffledOptions);
      setIsAnswerChecked(false);
      playAudio();
    }
  }, [currentQuestion, currentSection, testSections])

  useEffect(() => {
    const handleScroll = () => {
      // Проверяем, находится ли пользователь в самом верху страницы
      if (window.scrollY === 0) {
        setIsProgressBarVisible(true);
      } else {
        setIsProgressBarVisible(false);
      }
    };

    // Добавляем обработчик события скролла
    window.addEventListener('scroll', handleScroll);

    // Убираем обработчик при размонтировании компонента, чтобы избежать утечек памяти
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
  }, [currentQuestion, currentSection])
  useEffect(() => {
    const savedProgress = localStorage.getItem("russianTestProgress")
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress)
      setCurrentSection(parsed.currentSection || 0)
      setCurrentQuestion(parsed.currentQuestion || 0)
      setAnswers(parsed.answers || {})
    }
  }, [])

  useEffect(() => {
    const progress = {
      currentSection,
      currentQuestion,
      answers,
    }
    localStorage.setItem("russianTestProgress", JSON.stringify(progress))
  }, [currentSection, currentQuestion, answers])
  useEffect(() => {
    const currentQ = testSections[currentSection]?.questions[currentQuestion]
    if (currentQ?.type === "listening") {
      setSelectedWords([])
      setWordBank(currentQ.options.sort(() => Math.random() - 0.5))
      setIsAnswerChecked(false)
    }
  }, [currentQuestion, currentSection])

  const allQuestions = testSections.flatMap((section) => section.questions)
  const totalQuestions = allQuestions.length
  const currentQuestionIndex =
      testSections.slice(0, currentSection).reduce((acc, section) => acc + section.questions.length, 0) + currentQuestion

  const handleAnswer = (answerIndex: number) => {
    setSelectedOption(answerIndex)
    const questionId = allQuestions[currentQuestionIndex].id
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))

    // Убираем фокус с активного элемента
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }

    // Автоматический переход к следующему вопросу
    // Автоматический переход к следующему вопросу
    setTimeout(() => {
      if (currentQuestion < testSections[currentSection].questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else if (currentSection < testSections.length - 1) {
        setCurrentSection((prev) => prev + 1)
        setCurrentQuestion(0)
      } else {
        setIsCompleted(true)
        setTimeout(() => setShowResults(true), 500); // <-- НОВАЯ СТРОКА
        return
      }
      // Сбрасываем выделение после перехода
      setSelectedOption(null)
    }, 500)
  }
  const playAudio = (speed = 1.0) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
      audioRef.current.play()
    }
  }

  const handleSelectWord = (word: string) => {
    setSelectedWords([...selectedWords, word])
    setWordBank(wordBank.filter((w) => w !== word))
  }

  const handleDeselectWord = (word: string, index: number) => {
    const newSelectedWords = [...selectedWords]
    newSelectedWords.splice(index, 1)
    setSelectedWords(newSelectedWords)
    setWordBank([word, ...wordBank]) // Возвращаем слово в начало банка
  }

  const handleCheckListeningAnswer = () => {
    const userAnswer = selectedWords.join(" ")
    const correctAnswer = allQuestions[currentQuestionIndex].correctAnswer as string
    const isCorrect = userAnswer === correctAnswer

    setIsAnswerCorrect(isCorrect)
    setIsAnswerChecked(true)

    // Сохраняем ответ (можно сохранять и сам ответ, и флаг корректности)
    const questionId = allQuestions[currentQuestionIndex].id
    setAnswers((prev) => ({ ...prev, [questionId]: isCorrect ? 1 : 0 })) // 1 - верно, 0 - неверно

    // Переход к следующему вопросу после небольшой задержки
    setTimeout(() => {
      if (currentQuestion < testSections[currentSection].questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else if (currentSection < testSections.length - 1) {
        setCurrentSection((prev) => prev + 1)
        setCurrentQuestion(0)
      } else {
        setIsCompleted(true)
        setTimeout(() => setShowResults(true), 500)
      }
    }, 1500)
  }
  useEffect(() => {
    if (showResults) {
      const showModal = () => {
        setTimeout(() => {
          setShowBonusModal(true);
        }, 5000);
      };

      showModal(); // Первый показ
    }
  }, [showResults]);
  const closeBonusModal = () => {
    setShowBonusModal(false);
    setBonusModalClosedCount(prev => prev + 1);
  };
  useEffect(() => {
    if (bonusModalClosedCount > 0 && showResults) {
      const timer = setTimeout(() => {
        setShowBonusModal(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [bonusModalClosedCount, showResults]);

  const calculateResults = () => {
    const sectionResults = testSections.map((section) => {
      const sectionQuestions = section.questions
      const correctAnswers = sectionQuestions.filter((q) => {
        if (q.type === 'listening') {
          return answers[q.id] === 1;
        }
        return answers[q.id] === q.correctAnswer
      }).length
      const percentage = Math.round((correctAnswers / sectionQuestions.length) * 100)
      return {
        title: section.title,
        correct: correctAnswers,
        total: sectionQuestions.length,
        percentage,
      }
    })

    const totalCorrect = Object.values(sectionResults).reduce((acc, result) => acc + result.correct, 0)
    const totalPercentage = Math.round((totalCorrect / totalQuestions) * 100)

    return { sectionResults, totalCorrect, totalPercentage }
  }

  const getFeedbackMessage = (percentage: number) => {
    if (percentage >= 90) {
      return {
        title: "Керемет!",
        message: "Сіз орыс тілін жоғары деңгейде білесіз. Біз сізбен мақтанамыз!",
        icon: <Trophy className="w-10 h-10 text-yellow-500" />,
      }
    } else if (percentage >= 70) {
      return {
        title: "Жақсы!",
        message: "Сіз орыс тілін жақсы білесіз. Аздаған жаттығулармен мінсіз болады!",
        icon: <Award className="w-10 h-10 text-blue-500" />,
      }
    } else if (percentage >= 50) {
      return {
        title: "Жаман емес!",
        message: "Сіз орыс тілінің негіздерін білесіз. Біраз жаттығу керек, бірақ жақсы бастама!",
        icon: <Star className="w-10 h-10 text-blue-400" />,
      }
    } else {
      return {
        title: "Бастама жасалды!",
        message: "Орыс тілін үйрену - қиын жол, бірақ сіз оны бастадыңыз! Біз сізге көмектесеміз.",
        icon: <CheckCircle className="w-10 h-10 text-green-500" />,
      }
    }
  }

/*  const submitToGoogleSheets = async (phone: string) => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const { sectionResults, totalCorrect, totalPercentage } = calculateResults()

      const data = {
        timestamp: new Date().toISOString(),
        phone: phone,
        totalScore: `${totalCorrect}/${totalQuestions}`,
        totalPercentage: totalPercentage,
        videoScore: `${sectionResults[0].correct}/${sectionResults[0].total}`,
        grammarScore: `${sectionResults[1].correct}/${sectionResults[1].total}`,
        translationScore: `${sectionResults[2].correct}/${sectionResults[2].total}`,
        writingScore: `${sectionResults[3].correct}/${sectionResults[3].total}`,
        detailedAnswers: JSON.stringify(answers),
      }

      // Замените YOUR_GOOGLE_APPS_SCRIPT_URL на ваш реальный URL
      const response = await fetch(
          "https://script.google.com/macros/s/AKfycbw3jV3koZiNrOR5r_ClX-xhDjE0BBg4F13x-vhK09YKYcu3VrNy-8sV4noiXqy4umaDCQ/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
      )

      setShowPhoneRequest(false)
      setShowResults(true)
    } catch (error) {
      setSubmitError("Деректерді жіберу кезінде қате орын алды. Қайталап көріңіз.")
    } finally {
      setIsSubmitting(false)
    }
  }*/

/*  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = formatPhoneNumber(value)
    setPhoneNumber(formatted)
    setIsPhoneValid(validatePhoneNumber(formatted))
  }*/
/*
  if (showPhoneRequest) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Тест аяқталды!</h1>
              <p className="text-lg text-gray-600">Нәтижелерді алу үшін телефон нөміріңізді енгізіңіз</p>
            </div>

            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700 block text-left">
                    Телефон нөмірі
                  </label>
                  <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 700 123 45 67"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className={`text-center text-lg transition-colors ${
                          phoneNumber.length > 3
                              ? isPhoneValid
                                  ? "border-green-500 focus:border-green-500"
                                  : "border-red-500 focus:border-red-500"
                              : ""
                      }`}
                      disabled={isSubmitting}
                      maxLength={18}
                  />
                  {phoneNumber.length > 3 && !isPhoneValid && (
                      <p className="text-red-600 text-xs text-left">Дұрыс қазақстандық нөмірді енгізіңіз</p>
                  )}
                  {phoneNumber.length > 3 && isPhoneValid && (
                      <p className="text-green-600 text-xs text-left">✓ Телефон нөмірі дұрыс</p>
                  )}
                </div>

                {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

                <Button
                    onClick={() => submitToGoogleSheets(phoneNumber)}
                    disabled={!isPhoneValid || isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Жіберілуде...
                      </div>
                  ) : (
                      <>
                        <Phone className="w-5 h-5 mr-2" />
                        Нәтижелерді алу
                      </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <p className="text-xs text-gray-500">
              Сіздің деректеріңіз қорғалған және тек тест нәтижелерін жіберу үшін пайдаланылады
            </p>
          </div>
        </div>
    )
  }*/

  if (showResults) {
    const { sectionResults, totalCorrect, totalPercentage } = calculateResults()
    const feedback = getFeedbackMessage(totalPercentage)

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full space-y-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                {feedback.icon}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{feedback.title}</h1>
              <p className="text-lg text-gray-600">
                Сіздің нәтижеңіз: {totalCorrect} / {totalQuestions} ({totalPercentage}%)
              </p>
              <p className="text-md text-gray-600">{feedback.message}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {sectionResults.map((result, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {React.createElement(testSections[index].icon, {
                          className: "w-5 h-5 text-blue-600",
                        })}
                        <h3 className="font-semibold text-gray-900">{testSections[index].title}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                      <span>
                        {result.correct}/{result.total}
                      </span>
                          <span className="font-semibold">{result.percentage}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-bar-fill" style={{ width: `${result.percentage}%` }}>
                            {result.percentage > 30 && <div className="progress-bar-glow"></div>}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center">
                    <Star className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Тестті өткеніңіз үшін рахмет!</h3>
                  </div>
                  <p className="text-gray-600">
                    Нәтижелер сақталды. Біздің маман жеке ұсыныстар беру үшін сізбен жақын арада байланысады.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={() => window.open("https://akcentacademy.kz/prob-platform", "_blank")}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Бонусымды аламын
                    </Button>
                    <Button onClick={() => window.location.reload()} variant="outline">
                      Тестті қайта өту
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
          {showBonusModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card className="max-w-md w-full p-6 text-center shadow-2xl animate-fade-in-up">
                  <CardContent className="space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Trophy className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Құттықтаймыз!</h3>
                    <p className="text-md text-gray-600">
                      Сіздің нәтижелеріңіз өңделді. Бонусты алу үшін төмендегі батырманы басыңыз.
                    </p>
                    <Button
                        onClick={() => window.open("https://akcentacademy.kz/prob-platform", "_blank")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                    >
                      <Star className="w-5 h-5 mr-2" />
                      Бонусымды аламын
                    </Button>
                    <Button
                        onClick={closeBonusModal}
                        variant="outline"
                        className="w-full"
                    >
                      Жабу
                    </Button>
                  </CardContent>
                </Card>
              </div>
          )}

        </div>
    )
  }

  if (isCompleted) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Нәтижелерді өңдеу...</h2>
          </div>
        </div>
    )
  }

  const currentQuestionData = testSections[currentSection].questions[currentQuestion]

  return (
      <div className="min-h-screen bg-white">
        {/* Прогресс-бар */}
        <div
            className={`border-b border-gray-100 bg-white sticky top-0 z-10 transform transition-transform duration-300 ${
                isProgressBarVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
          <div className="w-full max-w-4xl lg:max-w-none mx-auto px-4 lg:px-8 xl:px-16 py-4 flex flex-col items-center">
            {/* Контейнер для "эликсира" */}
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner relative">
              <div
                  className="h-full rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-blue-500/50"
                  style={{width: `${(currentQuestionIndex / totalQuestions) * 100}%`}}
              >
              </div>
            </div>

            {/* Счетчик вопросов */}
            <p className="text-sm text-gray-500 mt-2">
              Сұрақ {currentQuestionIndex + 1} / {totalQuestions}
            </p>
          </div>
        </div>

        {/* Основной контент */}
        <div className="w-full max-w-4xl lg:max-w-none mx-auto px-4 lg:px-8 xl:px-16 py-8 lg:py-12">
          <div className="space-y-8">
            {/* Вопрос */}
            <div className="text-center space-y-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                {currentQuestionData.question}
              </h1>

              {/* Медиа контент */}
              {currentQuestionData.media && (
                  <div className="flex justify-center">
                    {currentQuestionData.media.type === "video" && (
                        <CustomVideoPlayer src={currentQuestionData.media.url}/>
                    )}

                    {currentQuestionData.media.type === "image" && (
                        <img
                            src={currentQuestionData.media.url || "/placeholder.svg"}
                            alt="Вопрос"
                            className="w-full max-w-[600px] max-h-[70vh] h-auto object-contain rounded-md shadow mx-auto"
                        />


                    )}
                    {currentQuestionData.media.type === "audio" && currentQuestionData.type !== "listening" && (
                        <div className="w-full max-w-lg p-4 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <Button
                                onClick={() => playAudio(1.0)}
                                size="lg"
                                className="p-4 h-20 w-20 rounded-2xl bg-blue-600 hover:bg-blue-700"
                            >
                              <img src="/play.png" alt="Play" className="h-12 w-12" />
                            </Button>
                            <p className="text-sm text-gray-600">Тыңдау үшін басыңыз</p>
                            <audio ref={audioRef} src={currentQuestionData.media.url} preload="auto"/>
                          </div>
                        </div>
                    )}
                  </div>
              )}
            </div>
            {/* ... ваш код до вариантов ответов */}

            {/* Варианты ответов */}
            <div className="max-w-3xl mx-auto">
              {currentQuestionData.type === "listening" ? (
                  // >>>>> НАЧАЛО НОВОГО БЛОКА ДЛЯ АУДИРОВАНИЯ <<<<<
                  <div className="space-y-6">
                    <div className="flex justify-center items-center gap-6">
                      <button
                          onClick={() => playAudio(1.0)}
                          className="cursor-pointer transition-transform hover:scale-110 active:scale-95 p-2"
                      >
                        <img src="/play2.png" alt="Play" className="h-16 w-16"/>
                      </button>

                      <button
                          onClick={() => playAudio(0.7)}
                          className="cursor-pointer transition-transform hover:scale-110 active:scale-95 p-2"
                      >
                        <img src="/snail.png" alt="slow" className="h-14 w-14"/>
                      </button>

                      <audio ref={audioRef} src={currentQuestionData.media?.url} preload="auto"/>
                    </div>

                    <Card className="min-h-[80px] border-2 border-dashed">
                      <CardContent className="p-4 flex flex-wrap gap-2 items-center">
                        {selectedWords.map((word, index) => (
                            <Button
                                key={`${word}-${index}`}
                                variant="secondary"
                                className="text-lg px-4 py-2 cursor-pointer"
                                onClick={() => handleDeselectWord(word, index)}
                            >
                              {word}
                            </Button>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Здесь начинается измененный блок для отображения слотов */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {initialWordBankOrder.map((word: string, index: number) => {
                        const isSelected = !wordBank.includes(word);
                        return (
                            <div
                                key={index}
                                className={`border-2 border-dashed border-gray-300 rounded-md min-w-[80px] min-h-[44px] flex items-center justify-center transition-all duration-300`}
                            >
                              {!isSelected ? (
                                  <Button
                                      variant="outline"
                                      className="p-2 text-lg cursor-pointer transition-transform duration-100 ease-in-out hover:scale-105"
                                      onClick={() => handleSelectWord(word)}
                                  >
                                    {word}
                                  </Button>
                              ) : (
                                  // Показываем пустой слот с сохранением размера
                                  <div
                                      className="p-2 text-lg text-transparent select-none min-w-[64px] min-h-[36px] flex items-center justify-center">
                                    {word}
                                  </div>
                              )}
                            </div>
                        );
                      })}
                    </div>

                    {/* Кнопка проверки ответа */}
                    <div className="flex justify-center mt-6">
                      <Button
                          onClick={handleCheckListeningAnswer}
                          disabled={selectedWords.length === 0 || isAnswerChecked}
                          className="bg-blue-600 hover:bg-blue-700 text-lg py-3 px-8"
                      >
                        Проверить
                      </Button>
                    </div>

                    {isAnswerChecked && (
                        <div className="flex items-center justify-center gap-2 mt-4 text-xl font-semibold">
                          {isAnswerCorrect ? (
                              <>
                                <Check className="h-6 w-6 text-green-500"/>
                                <span className="text-green-600">Верно!</span>
                              </>
                          ) : (
                              <>
                                <X className="h-6 w-6 text-red-500"/>
                                <span className="text-red-600">Неверно!</span>
                              </>
                          )}
                        </div>
                    )}
                  </div>
              ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {currentQuestionData.options.map((option, index) => (
                        <Button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className={`w-full text-lg py-6 h-auto transition-all duration-200 ease-in-out ${selectedOption === index
                                ? "bg-blue-600 text-white shadow-lg scale-105"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                            }`}
                        >
                          {option}
                        </Button>
                    ))}
                  </div>
              )}
            </div>
          </div>
        </div>

      </div>

  )
}
