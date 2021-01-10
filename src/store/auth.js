import firebase from "firebase";

export default {
    actions:{
        async login({commit},{email,password}){
            try {
                await firebase.auth().signInWithEmailAndPassword(email,password)
            }
            catch (e){
                commit('setError',e);
                throw e;
            }
        },
        async register({dispatch,commit},{email,password,name}){

            try {
                await firebase.auth().createUserWithEmailAndPassword(email,password)
                const uid = await dispatch('getUid');

                let ref = `/users/${uid}/info`;
                let set = {
                    bill:10000,
                    name
                };
                await firebase.database().ref(ref).set(set)
            }
            catch (e){
                commit('setError',e);
                throw e;
            }
        },
        async getUid() {
            const user = await firebase.auth().currentUser;
            return user ? user.uid : null;
        },
        async logout({commit}){
            await firebase.auth().signOut();
            commit('clearInfo')
        }
    }
}