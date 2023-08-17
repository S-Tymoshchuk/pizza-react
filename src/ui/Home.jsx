import CreateUser from '../features/user/CreateUser.jsx';
import { useSelector } from 'react-redux';
import Button from './Button.jsx';

function Home() {
  const { username } = useSelector((state) => state.user);

  return (
    <div className='my-10 text-center sm:my-16'>
      <h1 className='mb-8 text-center text-xl font-semibold'>
        The best pizza.
        <br />
        <span className='text-yellow-500'>
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button type='primary' to='/menu'>
          Continue ordering
        </Button>
      )}
    </div>
  );
}

export default Home;
