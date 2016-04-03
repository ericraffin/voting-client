import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
	it('handles SET_STATE', () => {
	    const initialState = Map();
	    const action = {
	      type: 'SET_STATE',
	      state: Map({
	        vote: Map({
	          pair: List.of('Trainspotting', '28 Days Later'),
	          tally: Map({Trainspotting: 1})
	        })
	      })
	    };
	    const nextState = reducer(initialState, action);

	    expect(nextState).to.equal(fromJS({
	      vote: {
	        pair: ['Trainspotting', '28 Days Later'],
	        tally: {Trainspotting: 1}
	      }
	    }));
	  });

	if('handles SET_STATE with JS Payload', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '20 Days Later'],
					tally: {Trainspotting:1}
				}
			}
		}

		const nextState = reducer(initialState,action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '20 Days Later'],
				tally: {Trainspotting:1}
			}
		}));
	});

	it('handles SET_STATE without initial state', () => {
		const initialState = undefined;
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '20 Days Later'],
					tally: {Trainspotting:1}
				}
			}
		}
		const nextState = reducer(initialState,action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '20 Days Later'],
				tally: {Trainspotting:1}
			}
		}));
	});
	/*
	it('handles VOTE by setting hasVoted', () => {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '20 Days Later'],
				tally: {Trainspotting:1}
			}
		});	
		const action = {type: 'VOTE', entry: 'Trainspotting'};
		const nextState = reducer(state,action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '20 Days Later'],
				tally: {Trainspotting:1}
			},
			hasVoted: 'Trainspotting'
		}));
	});*/

	it('handles VOTE by setting the round', () => {
		const state = fromJS({
			vote: {
				round:1,
				pair: ['Trainspotting', '20 Days Later'],
				tally: {Trainspotting:1}
			}
		});	
		const action = {type: 'VOTE', entry: 'Trainspotting'};
		const nextState = reducer(state,action);

		expect(nextState).to.equal(fromJS({
			vote: {
				round:1,
				pair: ['Trainspotting', '20 Days Later'],
				tally: {Trainspotting:1}
			},
			myVote: {
				round:1,
				entry: 'Trainspotting'
			}
		}));
	});

	it('does not set myVote when VOTE on an invalid entry', () => {
		const state = fromJS({
			vote: {
				round: 1,
				pair: ['Trainspotting', '20 Days Later'],
				tally: {Trainspotting:1}
			}
		});	
		const action = {type: 'VOTE', entry:'Sunshine'};
		const nextState = reducer(state,action);
		expect(nextState).to.equal(fromJS({
			vote: {
				round:1,
				pair: ['Trainspotting', '20 Days Later'],
				tally: {Trainspotting:1}
			}
		}));
	});

	it('removes myVote on SET_STATE if round has changed', () => {
	  const initialState = fromJS({
	    vote: {
	    	round:1,
	      	pair: ['Trainspotting', '28 Days Later'],
	      	tally: {Trainspotting: 1}
	    },
	    myVote: {
	    	round: 1,
	    	entry: 'Trainspotting'
	    }
	  });
	  const action = {
	    type: 'SET_STATE',
	    state: {
	      vote: {
	      	round:2,
	        pair: ['Sunshine', 'Trainspotting']
	      }
	    }
	  };
	  const nextState = reducer(initialState, action);

	  expect(nextState).to.equal(fromJS({
	    vote: {
	    	round:2,
	      	pair: ['Sunshine', 'Trainspotting']
	    }
	  }));
	});


})