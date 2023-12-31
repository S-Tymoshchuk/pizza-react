import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant.js';
import Button from '../../ui/Button.jsx';
import { useSelector } from 'react-redux';
import { getCart } from '../cart/cartSlice.js';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const { username } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  // const [withPriority, setWithPriority] = useState(false);
  // const cart = fakeCart;
  const cart = useSelector(getCart);

  return (
    <div className='px-6 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      {/*<Form method='POST' action='/order/new'>*/}
      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <div className='grow'>
            <input
              className='input'
              type='text'
              name='customer'
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input' type='tel' name='phone' required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='shrink grow'>
            <input className='input' type='text' name='address' required />
          </div>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none
             focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor='priority'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <Button type='primary' disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
