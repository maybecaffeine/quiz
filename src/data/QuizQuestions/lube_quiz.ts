// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

import { Topic } from '.'

export const react: Topic = {
  topic: 'Tribology and lubricants',
  level: 'Intermediate',
  totalQuestions: 10,
  totalScore: 100,
  totalTime: 120,
  questions: [
    {
      question: 'High pressure air bubble collapse is a characteristic of which wear mode?',
      choices: ['Cavitation', 'Adhesion', 'Abrasion', 'Fatigue'],
      type: 'MCQs',
      correctAnswers: ['Cavitation'],
      score: 10,
    },
    {
      question: 'Tribology is the study of which three engineering topics?',
      choices: ['Chemical, Mechanical, Electrical', 'Surface finish, Adhesion, Wear', 'Friction, Lubrication, Wear', 'Design, Construction, Maintenance'],
      type: 'MCQs',
      correctAnswers: ['Friction, Lubrication, Wear'],
      score: 10,
    },
    {
      question: 'What are the three modes of lubricant film condition?',
      choices: ['Full film, Partial film, Low film', 'Full film, Mixed film, Boundary lubrication', 'Dry, Sliding, Translucent', 'Pure Sliding, Pure Rolling, Fluid'],
      type: 'MCQs',
      correctAnswers: ['Full film, Mixed film, Boundary lubrication'],
      score: 10,
    },
    {
      question: 'What is a lubricant additive?',
      choices: ['A type of base stock designed to have enhanced properties.', 'A semi fluid dispersion of a thickener in a metallic soap used to control the NLGI consistency.', 'Additives are blended with the base stock oil to strengthen or modify the characteristics of the lubricant.', 'The leftover material after crude oil is taken through the refining process.'],
      type: 'MCQs',
      correctAnswers: ['Additives are blended with the base stock oil to strengthen or modify the characteristics of the lubricant.'],
      score: 10,
    },
    {
      question: 'Which of the following is an advantage of Phosphate Ester oils?',
      choices: ['Low cost', 'High temperature stability', 'High oxidative stability', 'Fire resistance'],
      type: 'MCQs',
      correctAnswers: ['Fire resistance'],
      score: 10,
    },
    {
      question: 'Which of the following would be a common application for vegetable-based lubricants?',
      choices: ['Food processing', 'Power generation', 'Robotics', 'Hydraulics'],
      type: 'MCQs',
      correctAnswers: ['Food processing'],
      score: 10,
    },
    {
      question: 'What is the Karl Fischer test used to measure?',
      choices: ['The amount of water in the oil', 'The oil viscosity index', 'The oil oxidative stability', 'The oil pour point'],
      type: 'MCQs',
      correctAnswers: ['The amount of water in the oil'],
      score: 10,
    },
    {
      question: 'What is viscosity?',
      choices: ['The measure of "flow-ability" of an oil at a pre-set temperature.', 'A representation of the amount of change in thickness for a given change in temperature', 'A representation of the relative stiffness of the lubricant', 'A guideline for how long a lubricant can be in-service before an oil change.'],
      type: 'MCQs',
      correctAnswers: ['The measure of "flow-ability" of an oil at a pre-set temperature.'],
      score: 10,
    },
    {
      question: 'Why is the correct viscosity selection a key requirement for machine reliability?',
      choices: ['Because insufficient viscosity can clog filters', 'Because insufficient viscosity can cause spikes in the vibration frequency spectrum', 'Because insufficient viscosity can create electrical current', 'Because insufficient viscosity creates boundary lubrication conditions'],
      type: 'MCQs',
      correctAnswers: ['Because insufficient viscosity creates boundary lubrication conditions'],
      score: 10,
    },
    {
      question: 'Which of the following oil types are recommended for hydraulic applications?',
      choices: ['AW oils', 'EP oils', 'SHC Oils', 'Compounded Oils'],
      type: 'MCQs',
      correctAnswers: ['AW oils'],
      score: 10,
    },
  ],
}
