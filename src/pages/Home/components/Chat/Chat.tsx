import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRegisterWebsocketChatListener } from 'hooks/websocketListener';
import { setWebsocketChat } from 'redux/slices';

export const Chat = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const onMessage = async (message: any) => {
    const displayText = message?.data?.content;

    if (displayText && displayText !== text) {
      setText(displayText);
      dispatch(setWebsocketChat(null));
      return;
    }
  };

  useRegisterWebsocketChatListener(onMessage);

  return (
    <div className='chat card flex-grow-1 h-100'>
      <div className='card-body'>
        {text && (
          <ul>
            <li className='d-flex flex-column gap-2'>
              <div className='user'>Nicu Sordan</div>
              <div className='message'>{text}</div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
