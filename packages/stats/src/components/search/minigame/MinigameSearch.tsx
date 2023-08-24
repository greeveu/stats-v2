import React, {useContext, useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {globalContext} from 'components/context/ContextProvider';
import {MultiGameCard} from 'components/gameCard/multi/MultiGameCard';
import {MinigameGroup, minigames, SingleMinigame, Type} from 'minigames';
import {SingleGameCard} from 'components/gameCard/single/SingleGameCard';
import style from './minigameSearch.module.sass';
import {config} from 'config';

/**
 * Filters minigames and minigame groups for a specific regex
 * @param regex
 */
const searchMinigames = (regex: RegExp): (SingleMinigame | MinigameGroup)[] =>
{

	return minigames.filter((item) =>
	{
		// Matches main title
		if (!!item.title.match(regex))
		{
			return true;
		}
		if (item.type === Type.Minigame)
		{
			return false;
		}

		return !!(item.minigames.find((item) =>
		{
			// Matches subtitle of sub minigame
			if (!!item.subtitle.match(regex))
			{
				return true;
			}
			// Matches title of sub minigame
			if (!!item.title.match(regex))
			{
				return true;
			}
			return false;
		}));
	});
};

export const MinigameSearch: React.FunctionComponent = observer(() =>
{
	const context = useContext(globalContext);
	const results = useMemo(() =>
	{
		// Priority results
		const prioResults = searchMinigames(new RegExp(`^${context.search.searchFor}.*`, 'i'));
		if (prioResults.length >= config.searchResultLimit)
		{
			return prioResults.slice(0, config.searchResultLimit);
		}

		// Other results
		const otherResults = searchMinigames(new RegExp(`${context.search.searchFor}`, 'i'));
		const deduplicate = new Set([...prioResults, ...otherResults]);
		return Array.from(deduplicate).slice(0, config.searchResultLimit);

	}, [context.search.searchFor]);

	return (
		<div>
			{
				results.map((item) =>
				{
					const key = item.title + context.search.searchFor;
					if (item.type === Type.Minigame)
					{
						return (
							<div
								className={style.item}
								key={key}
							>
								<SingleGameCard
									title={item.title}
									image={item.image}
									href={''}
								/>
							</div>
						);
					}
					return (
						<div
							className={style.item}
							key={key}
						>
							<MultiGameCard
								title={item.title}
								subTitle={item.subTitle}
								minigames={item.minigames.map((item) =>
								{
									return {
										href: '',
										image: item.image,
										subTitle: item.subtitle,
										highlight: !!item.subtitle.match(new RegExp(`${context.search.searchFor}`, 'i')),
									};
								})}
							/>
						</div>
					);
				})
			}
		</div>
	);
});
