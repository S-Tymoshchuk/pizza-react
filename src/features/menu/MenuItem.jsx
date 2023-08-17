import { formatCurrency } from '../../utils/helpers.js';
import Button from '../../ui/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrenCartById } from '../cart/cartSlice.js';
import DeleteItem from '../cart/DeleteItem.jsx';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrenCartById(id));

  function handleAddCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  const isInCart = currentQuantity > 0;

  return (
    <li className='flex gap-4 py-2'>
      <img
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className='flex flex-grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm uppercase'>Sold out</p>
          )}
          <div className='flex items-center gap-6'>
            {isInCart && (
              <div className='flex items-center gap-3 sm:gap-8'>
                <DeleteItem pizzaId={id} />
              </div>
            )}

            {!soldOut && (
              <Button onClick={handleAddCart} type='small'>
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
