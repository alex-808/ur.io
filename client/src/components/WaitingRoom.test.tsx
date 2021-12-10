import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitForElement,
  cleanup,
} from '@testing-library/react'

import renderer from 'react-test-renderer'

import { WaitingRoom, Props } from './WaitingRoom'

function renderWaitingRoom(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    roomID: '12345',
  }
  return render(<WaitingRoom {...defaultProps} {...props} />)
}

afterEach(cleanup)

describe('<WaitingRoom />', () => {
  it('display game code', async () => {
    const { findByTestId } = renderWaitingRoom()
    const waitingRoom = await findByTestId('waiting-room')

    expect(waitingRoom).toHaveTextContent('12345')
  })
  it('matches snapshot', async () => {
    const tree = renderer.create(<WaitingRoom roomID="12345" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
