import { render, fireEvent } from '@testing-library/react-native';
import React from 'react'
// import { QuestionsBoard } from '../QuestionsBoard';
import RepoList from '../App/ReusableComponents/RepoList'

import gitResponse from '../App/Fixtures/gitRespos.json'

fetch = jest.fn(() => Promise.resolve());

beforeAll(() => {
    jest.mock('@react-native-community/async-storage');
})

it('should create an item', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
        <RepoList />
    );
    const btn = getByTestId('btn-button');
  
 // Not to be crashed if text os not present
    // fireEvent.changeText(textInput);
    

    console.log("place holder>>>", textInput)
})




