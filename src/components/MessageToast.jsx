import { useSelector } from 'react-redux';

function MessageToast() {
  const messages = useSelector((state) => state.message);

  return (
    <>
      <div className='toast-container position-fixed top-0 end-0 p-3'>
        {messages.map((message) => (
          <div
            className='toast show'
            role='alert'
            aria-live='assertive'
            aria-atomic='true'
            key={message.id}
          >
            <div className={`toast-header text-sec-100 bg-${message.type}`}>
              <strong className='me-auto'>{message.title}</strong>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='toast'
                aria-label='Close'
              ></button>
            </div>
            <div className='toast-body text-start'>{message.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MessageToast;
