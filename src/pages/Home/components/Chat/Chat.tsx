export const Chat = () => {
  const messages = [
    { user: 'testUser', message: 'dfshfhdsh fsdjkbfdsb' },
    {
      user: 'testUser3232',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
    }
  ];

  return (
    <div className='chat card flex-grow-1 h-100'>
      <div className='card-body'>
        <ul>
          {messages.map((message, index) => {
            return (
              <li
                key={`${message.user}-${index}`}
                className='d-flex flex-column gap-2'
              >
                <div className='user'>{message.user}</div>
                <div className='message'>{message.message}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
