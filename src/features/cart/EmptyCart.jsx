import Button from '../../ui/Button.jsx';

function EmptyCart() {
  return (
    <div>
      <Button type='small' to='/menu'>
        &larr; Back to menu
      </Button>

      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
