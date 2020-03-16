import React from 'react'
import InfoCard from './InfoCard/InfoCard'
import classes from './InfoCards.module.css'

const InfoCards = props => {
	// const cardArr =
	return (
		<div className={classes.InfoCards}>
			{props.cardsData.map(card => {
				return (
					<div key={card.id} className={classes.Card}>
						<InfoCard data={card} />
					</div>
				)
			})}
		</div>
	)
}

export default InfoCards