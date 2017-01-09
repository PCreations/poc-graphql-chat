import React from 'react'


const MessageInput = ({
  onSubmit,
  onChange,
  message
}) => {
  let inputDOM
  return (
    <div>
      <form>
        <input
          placeholder={'Votre message'}
          onChange={e => onChange(e.target.value)}
          value={message}
        />
        <input
          type='submit'
          value='envoyer'
          onClick={e => { e.preventDefault(); onSubmit() }}
        />
      </form>
    </div>
  )
}

MessageInput.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  message: React.PropTypes.string
}

export default MessageInput
