const { test, describe, expect } = require('@playwright/test')

describe('Anecdotes', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByRole('heading', { name: 'Anecdotes' })).toBeVisible()
    await expect(page.getByText('If it hurts, do it more often')).toBeVisible()
  })

  test('one can create a new anecdote', async ({ page }) => {
    const anecdoteText = `e2e anecdote ${Date.now()}`

    await page.goto('')
    await page.locator('form input[name="anecdote"]').fill(anecdoteText)
    await page.getByRole('button', { name: 'create' }).click()
    await expect(page.getByText(anecdoteText, { exact: true })).toBeVisible()
    await expect(page.getByText(`a new anecdote '${anecdoteText}' added`)).toBeVisible()
  })

  test('one can vote for an anecdote', async ({ page }) => {
    await page.goto('')
    const anecdote = page.getByText('If it hurts, do it more often').locator('..')
    const voteButton = anecdote.getByRole('button', { name: 'vote' })
    const votesText = anecdote.getByText(/has \d+/)
    const initialVotes = Number((await votesText.textContent()).match(/\d+/)[0])

    await voteButton.click()

    await expect(anecdote.getByText(`has ${initialVotes + 1}`)).toBeVisible()
    await expect(page.getByText('You voted \'If it hurts, do it more often\'')).toBeVisible()
  })
})
