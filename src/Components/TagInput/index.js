import React from 'react'
import { Text } from 'rebass'
import TagsInput from 'react-tagsinput'
import Autosuggest from 'react-autosuggest'
import './_overwrite.css'

const Index = props => {
  const autocompleteRenderInput = ({ addTag, ...exProps }) => {
    const handleOnChange = (e, {newValue, method}) => {
      if (method === 'enter') {
        e.preventDefault()
      } else {
        exProps.onChange(e)
      }
    }

    const inputValue = (exProps.value && exProps.value.trim().toLowerCase()) || ''
    const inputLength = inputValue.length

    let suggestions = (props.suggestions && props.suggestions.filter((suggestion) => {
      return suggestion.toLowerCase().slice(0, inputLength) === inputValue
    })) || []

    return (
      <Autosuggest
        ref={exProps.ref}
        suggestions={suggestions}
        shouldRenderSuggestions={value => value && value.trim().length > 0}
        getSuggestionValue={suggestion => suggestion}
        renderSuggestion={suggestion => <Text>{suggestion}</Text>}
        inputProps={{...exProps, onChange: handleOnChange}}
        onSuggestionSelected={(e, {suggestion}) => {
          addTag(suggestion)
        }}
        onSuggestionsClearRequested={() => {}}
        onSuggestionsFetchRequested={() => {}}
      />
    )
  }

  return <TagsInput renderInput={autocompleteRenderInput} value={props.value || []} onChange={props.onChange} />
}

export default Index