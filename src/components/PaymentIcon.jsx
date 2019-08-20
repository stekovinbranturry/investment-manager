import React from 'react';
import PropTypes from 'prop-types';
import alipayIcon from '../image/alipay.svg';
import wechatpayIcon from '../image/wechatpay.svg';
import unionpayIcon from '../image/unionpay.svg';

const PaymentIcon = ({ type }) => {
	switch (type) {
		case 'wechatpay':
			return (
				<img style={{ height: '1rem' }} src={wechatpayIcon} alt='wechatpay' />
			);
		case 'alipay':
			return <img style={{ height: '1rem' }} src={alipayIcon} alt='alipay' />;
		case 'unionpay':
			return (
				<img style={{ height: '1rem' }} src={unionpayIcon} alt='unionpay' />
			);
		default:
			return null;
	}
};

PaymentIcon.propTypes = {
	type: PropTypes.string
};

export default PaymentIcon;
