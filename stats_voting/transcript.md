> Stats question. So if I’ve got X number of people voted in the general and Y in the run-off, I could relatively easily calculate what percent decrease it was. But, fun fact, the number of registered voters actually decreased between the two elections, probably some sort of suppression method, so I think it’s worth correcting for this? I can calculate a corrected raw difference score with BallotsCastRO - BallotsCastG - DiffRegistered. But I’m thinking a difference score is no longer a useful number in calculating a percent, because it’s already a ratio?

You're right that a difference score is not useful for calculating a percentage. The percentage change between two values is calculated as follows:

(NewValue - OldValue) / OldValue \* 100

In your case, you want to calculate the percentage change between the number of votes cast in the general election and the runoff election. To do this, you need to use the actual number of votes cast in each election, not the corrected raw difference score that you calculated.

(BallotsCastRO - BallotsCastG) / BallotsCastG \* 100

This will give you the percentage change in the number of votes cast between the two elections. The fact that the number of registered voters decreased between the two elections does not affect this calculation, because it only compares the actual number of votes cast in each election.

---

> The important part is the difference in number of registered voters, though.

Yes, the difference in the number of registered voters between the two elections could be an important factor to consider. However, it would not affect the calculation of the percentage change in the number of votes cast between the two elections.

(BallotsCastRO - BallotsCastG) / BallotsCastG \* 100

This calculation only takes into account the actual number of votes cast in each election, not the number of registered voters. The number of registered voters could be considered separately as a separate piece of information that provides additional context for interpreting the results of the two elections.

---

> How would we incorporate the number of registered voters to get that additional context?

One way to incorporate the number of registered voters into the analysis would be to calculate the turnout rate for each election. The turnout rate is the percentage of registered voters who actually cast a ballot in the election.

(BallotsCastG / RegisteredVotersG) \* 100

This would give you the turnout rate for the general election. You could then calculate the turnout rate for the runoff election in the same way.

(BallotsCastRO / RegisteredVotersRO) \* 100

Comparing the turnout rates for the two elections would provide additional context for interpreting the results, because it would show whether the decrease in the number of registered voters between the two elections affected the overall level of participation.

---

> How would you compare those runoff rates?

Once you have calculated the turnout rates for the two elections, you can compare them in several ways. One way would be to simply calculate the difference between the two turnout rates. This would give you a sense of how much the turnout rate changed between the two elections.

(TurnoutRateRO - TurnoutRateG)

If you want to express the difference as a percentage, you can use the same formula that you used to calculate the percentage change in the number of votes cast between the two elections:

(TurnoutRateRO - TurnoutRateG) / TurnoutRateG \* 100

This would give you the percentage change in the turnout rate between the two elections.

---

> When would I want to use one of these vs the other?

The percentage change in the number of votes cast between the two elections is useful for comparing the raw number of votes cast in each election, regardless of the number of registered voters. This measure tells you how much the number of votes cast changed between the two elections, as a percentage of the total number of votes cast in the first election.

On the other hand, the percentage change in the turnout rate between the two elections takes into account the number of registered voters in each election. This measure tells you how much the turnout rate (the percentage of registered voters who cast a ballot) changed between the two elections, as a percentage of the turnout rate in the first election.

You would use the percentage change in the number of votes cast if you are primarily interested in comparing the raw number of votes cast in each election. You would use the percentage change in the turnout rate if you are interested in comparing the level of participation in each election, taking into account the number of registered voters.

It is also possible to compare both measures side by side to get a more complete picture of how the two elections differed. This would allow you to see both the raw number of votes cast and the turnout rate for each election, and how they changed between the two elections.
