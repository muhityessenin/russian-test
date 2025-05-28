"use client"

import React from "react"

import { useState } from "react"
import { Play, BookOpen, Languages, PenTool, CheckCircle, Star, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

// Типы данных
interface Question {
  id: number
  type: "video" | "grammar" | "translation" | "writing"
  question: string
  media?: {
    type: "video" | "audio" | "image"
    url: string
  }
  options: string[]
  correctAnswer: number
}

interface TestSection {
  id: string
  title: string
  icon: any
  questions: Question[]
}

// Функция для форматирования номера телефона
const formatPhoneNumber = (value: string): string => {
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
}

// Функция для валидации российского номера
const validatePhoneNumber = (phone: string): boolean => {
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
    "700", "701", "702", "775", "776", "777",

    // Beeline (Кар-Тел)
    "705", "707", "747", "771",

    // Tele2 / Altel (Мобайл Телеком-Сервис)
    "704", "706", "708",

    // Транстелеком, Astel и прочие альтернативные
    "709", "710", "711", "712", "713", "714", "715", "716", "717", "718", "719",

    // Зарезервированные / редкие
    "778", "779", "730", "731", "732", "733", "734", "735", "736", "737", "738", "739"
  ]


  return validCodes.includes(operatorCode)
}

const testSections: TestSection[] = [
  {
    id: "video",
    title: "Видео",
    icon: Play,
    questions: [
      {
        id: 1,
        type: "video",
        question: "Видеоны қарап шығып, диктор не туралы айтып жатқанын анықтаңыз.",
        media: {
          type: "video",
          url: "https://www.youtube.com/embed/SfP3WVYxlzE", // видео: прогноз погоды
        },
        options: ["Ауа райы", "Экономика", "Саясат", "Спорт"],
        correctAnswer: 0,
      },
      {
        id: 2,
        type: "video",
        question: "Диктордың көңіл-күйін анықтаңыз.",
        media: {
          type: "video",
          url: "https://www.youtube.com/embed/0U2zJOryFQ4", // интервью, нейтральная интонация
        },
        options: ["Көңілді", "Мұңды", "Нейтрал", "Ашулы"],
        correctAnswer: 2,
      },
      {
        id: 3,
        type: "video",
        question: "Бұл бейнеде не болып жатыр?",
        media: {
          type: "video",
          url: "https://www.youtube.com/embed/GBqJMI5bATg", // спортивный репортаж
        },
        options: ["Спорт жаңалықтары", "Кулинарлық шоу", "Саяси пікірталас", "Концерт"],
        correctAnswer: 0,
      },
      {
        id: 4,
        type: "video",
        question: "Диктор қандай кеңес беріп жатыр?",
        media: {
          type: "video",
          url: "https://www.youtube.com/embed/OqsdzqK0pdc", // здоровье, советы
        },
        options: ["Дұрыс тамақтану", "Ақша жинау", "Кәсіп ашу", "Саяхат"],
        correctAnswer: 0,
      },
      {
        id: 5,
        type: "video",
        question: "Бұл видеодағы адамның кәсібі қандай?",
        media: {
          type: "video",
          url: "https://www.youtube.com/embed/FDCEfCPi5UE", // парикмахер, интервью
        },
        options: ["Шаштараз", "Мұғалім", "Дәрігер", "Инженер"],
        correctAnswer: 0,
      },
    ]
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
      }
    ],
  },

  {
    id: "translation",
    title: "Перевод",
    icon: Languages,
    questions: [
      {
        id: 11,
        type: "translation",
        question: 'Как будет по-русски "Hello"?',
        options: ["Привет", "Пока", "Спасибо", "Пожалуйста"],
        correctAnswer: 0,
      },
      {
        id: 12,
        type: "translation",
        question: 'Переведите "Thank you"',
        options: ["Извините", "Спасибо", "Пожалуйста", "До свидания"],
        correctAnswer: 1,
      },{
        id: 13,
        type: "translation",
        question: 'Как будет по-русски "Goodbye"?',
        options: ["Привет", "До свидания", "Спасибо", "Пожалуйста"],
        correctAnswer: 1,
      },
      {
        id: 14,
        type: "translation",
        question: 'Переведите "Please"',
        options: ["Пожалуйста", "Спасибо", "Простите", "Доброе утро"],
        correctAnswer: 0,
      },
      {
        id: 15,
        type: "translation",
        question: 'Как будет по-русски "How are you?"',
        options: ["Что ты?", "Как ты?", "Куда ты?", "Где ты?"],
        correctAnswer: 1,
      }
    ],
  },
  {
    id: "writing",
    title: "Письмо",
    icon: PenTool,
    questions: [
      {
        id: 16,
        type: "writing",
        question: "Найдите ошибку в предложении:",
        options: [
          "Я покупаю хлеб в магазине",
          "Мы идём в театр сегодня",
          "Она читает интересную книгу",
          "Они играют в футбол во дворе",
        ],
        correctAnswer: 1,
      },
      {
        id: 17,
        type: "writing",
        question: 'Расставьте слова в правильном порядке: "читает / книгу / мама / интересную"',
        options: [
          "Мама читает интересную книгу",
          "Книгу читает мама интересную",
          "Интересную мама читает книгу",
          "Читает мама книгу интересную",
        ],
        correctAnswer: 0,
      },
      {
        id: 18,
        type: "writing",
        question: "Какое из предложений составлено неправильно?",
        options: [
          "Папа готовит ужин на кухне",
          "Мы читаем книгу интересную",
          "Сестра рисует на бумаге",
          "Дети бегают по улице",
        ],
        correctAnswer: 1,
      },
      {
        id: 19,
        type: "writing",
        question: 'Расставьте слова в правильном порядке: "собака / играет / мальчик / с"',
        options: [
          "Мальчик играет с собакой",
          "Собака играет с мальчиком",
          "Играет мальчик с собакой",
          "С мальчиком играет собака",
        ],
        correctAnswer: 0,
      },
      {
        id: 20,
        type: "writing",
        question: "Найдите предложение с грамматической ошибкой",
        options: [
          "Мама купила яблоки и бананы",
          "Они гулял в парке вечером",
          "Учитель объяснил тему хорошо",
          "Брат любит играть в футбол",
        ],
        correctAnswer: 1,
      }

    ],
  },
]

export default function RussianTest() {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("+7 ")
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [showPhoneRequest, setShowPhoneRequest] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const allQuestions = testSections.flatMap((section) => section.questions)
  const totalQuestions = allQuestions.length
  const currentQuestionIndex =
      testSections.slice(0, currentSection).reduce((acc, section) => acc + section.questions.length, 0) + currentQuestion

  const handleAnswer = (answerIndex: number) => {
    const questionId = allQuestions[currentQuestionIndex].id
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))

    // Автоматический переход к следующему вопросу
    setTimeout(() => {
      if (currentQuestion < testSections[currentSection].questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else if (currentSection < testSections.length - 1) {
        setCurrentSection((prev) => prev + 1)
        setCurrentQuestion(0)
      } else {
        setIsCompleted(true)
        setTimeout(() => setShowPhoneRequest(true), 500)
      }
    }, 300)
  }

  const calculateResults = () => {
    const sectionResults = testSections.map((section) => {
      const sectionQuestions = section.questions
      const correctAnswers = sectionQuestions.filter((q) => answers[q.id] === q.correctAnswer).length
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

  const submitToGoogleSheets = async (phone: string) => {
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
      const response = await fetch("https://script.google.com/macros/s/AKfycbw3jV3koZiNrOR5r_ClX-xhDjE0BBg4F13x-vhK09YKYcu3VrNy-8sV4noiXqy4umaDCQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      setShowPhoneRequest(false)
      setShowResults(true)
    } catch (error) {
      setSubmitError("Произошла ошибка при отправке данных. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = formatPhoneNumber(value)
    setPhoneNumber(formatted)
    setIsPhoneValid(validatePhoneNumber(formatted))
  }

  if (showPhoneRequest) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Тест завершён!</h1>
              <p className="text-lg text-gray-600">Для получения результатов укажите ваш номер телефона</p>
            </div>

            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700 block text-left">
                    Номер телефона
                  </label>
                  <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 999 123 45 67"
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
                      <p className="text-red-600 text-xs text-left">Введите корректный российский номер телефона</p>
                  )}
                  {phoneNumber.length > 3 && isPhoneValid && (
                      <p className="text-green-600 text-xs text-left">✓ Номер телефона корректный</p>
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
                        Отправляем...
                      </div>
                  ) : (
                      <>
                        <Phone className="w-5 h-5 mr-2" />
                        Получить результаты
                      </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <p className="text-xs text-gray-500">
              Ваши данные защищены и используются только для отправки результатов теста
            </p>
          </div>
        </div>
    )
  }

  if (showResults) {
    const { sectionResults, totalCorrect, totalPercentage } = calculateResults()

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full space-y-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Тест завершён!</h1>
              <p className="text-lg text-gray-600">
                Ваш результат: {totalCorrect} из {totalQuestions} ({totalPercentage}%)
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {sectionResults.map((result, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {React.createElement(testSections[index].icon, {
                          className: "w-5 h-5 text-blue-600",
                        })}
                        <h3 className="font-semibold text-gray-900">{result.title}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                      <span>
                        {result.correct}/{result.total}
                      </span>
                          <span className="font-semibold">{result.percentage}%</span>
                        </div>
                        <Progress value={result.percentage} className="h-2" />
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
                    <h3 className="text-lg font-semibold text-gray-900">Спасибо за прохождение теста!</h3>
                  </div>
                  <p className="text-gray-600">
                    Результаты сохранены. Наш специалист свяжется с вами в ближайшее время для предоставления персональных
                    рекомендаций.
                  </p>
                  <Button onClick={() => window.location.reload()} variant="outline" className="mx-auto">
                    Пройти тест заново
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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
            <h2 className="text-2xl font-semibold text-gray-900">Обрабатываем результаты...</h2>
          </div>
        </div>
    )
  }

  const currentQuestionData = testSections[currentSection].questions[currentQuestion]

  return (
      <div className="min-h-screen bg-white">
        {/* Прогресс-бар */}
        <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="w-full max-w-4xl lg:max-w-none mx-auto px-4 lg:px-8 xl:px-16 py-6">
            <div className="flex items-center justify-between mb-4">
              {testSections.map((section, index) => (
                  <div key={section.id} className="flex items-center">
                    <div
                        className={`flex items-center gap-3 ${
                            index < currentSection
                                ? "text-blue-600"
                                : index === currentSection
                                    ? "text-blue-600"
                                    : "text-gray-400"
                        }`}
                    >
                      <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              index < currentSection
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : index === currentSection
                                      ? "border-blue-600 bg-blue-50"
                                      : "border-gray-300"
                          }`}
                      >
                        {React.createElement(section.icon, { className: "w-5 h-5" })}
                      </div>
                      <span className="font-medium hidden sm:block">{section.title}</span>
                    </div>
                    {index < testSections.length - 1 && (
                        <div className={`w-8 h-0.5 mx-4 ${index < currentSection ? "bg-blue-600" : "bg-gray-300"}`} />
                    )}
                  </div>
              ))}
            </div>
            <Progress value={(currentQuestionIndex / totalQuestions) * 100} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">
              Вопрос {currentQuestionIndex + 1} из {totalQuestions}
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
                        <div className="w-full max-w-md lg:max-w-lg mx-auto aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <Play className="w-16 h-16 text-gray-400" />
                        </div>
                    )}
                    {currentQuestionData.media.type === "image" && (
                        <img
                            src={currentQuestionData.media.url || "/placeholder.svg"}
                            alt="Вопрос"
                            className="max-w-lg rounded-lg shadow-lg"
                        />
                    )}
                    {currentQuestionData.media.type === "audio" && (
                        <div className="w-full max-w-lg p-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-gray-600">Нажмите для воспроизведения</p>
                          </div>
                        </div>
                    )}
                  </div>
              )}
            </div>

            {/* Варианты ответов */}
            <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
              {currentQuestionData.options.map((option, index) => (
                  <Card
                      key={index}
                      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-blue-300"
                      onClick={() => handleAnswer(index)}
                  >
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <p className="text-lg lg:text-xl text-gray-900 flex-1">{option}</p>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}
