import React from 'react'


const MessageInput = ({
  onSubmit
}) => {
  let inputDOM
  return (
    <div>
      <form>
        <input
          ref={ref => inputDOM = ref}
          placeholder={'Votre message'}
        />
        <input type='submit' value='envoyer' onClick={() => onSubmit({ content: inputDOM.value})}/>
      </form>
    </div>
  )
}

MessageInput.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}

export default MessageInput
