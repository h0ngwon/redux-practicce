import React from 'react';
import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				'https://react-http-practice-647b8-default-rtdb.firebaseio.com/cart.json'
			);

			if (!response.ok) {
				throw new Error('error');
			}

			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }))
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Fetching cart data failed.',
				})
			);
		}
	};
};

export const sendCartData = (cartData) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: 'Pending',
				title: 'Sending...',
				message: 'Sending cart data...',
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				'https://react-http-practice-647b8-default-rtdb.firebaseio.com/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify({
                        items: cartData.items,
                        totalQuantity: cartData.totalQuantity,
                    }),
				}
			);

			if (!response.ok) {
				throw new Error('error');
			}
		};

		try {
			await sendRequest();

			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Send cart data successfully.',
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Send cart data failed.',
				})
			);
		}
	};
};
