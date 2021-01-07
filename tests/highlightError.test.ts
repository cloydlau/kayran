import highlightError from '../src/highlightError'

afterAll(() => {
  highlightError('.jest-lite-report__status--fail')
})
