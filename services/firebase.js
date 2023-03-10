import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import findTimeAgo from '../utils/date'

const firebaseConfig = {
  apiKey: 'AIzaSyCKYJPoa16jwyfmvfMGkortNLmS_nczaA4',
  authDomain: 'be-budgetmanager-28837.firebaseapp.com',
  projectId: 'be-budgetmanager-28837',
  storageBucket: 'be-budgetmanager-28837.appspot.com',
  messagingSenderId: '796957495515',
  appId: '1:796957495515:web:bdbe7f7de247ef0308bcfe',
  measurementId: 'G-EV5KPBHJV8'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()

export const createUserWithEmail = async ({ name, email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      return user
    })
    .then((user) => {
      updateProfile(user, {
        displayName: name
      })
      return auth.currentUser
    })
    .catch((error) => {
      throw error
    })
}

export const loginUserWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      return user.user
    })
    .catch((error) => {
      throw error
    })
}

export const logOutUser = async () => {
  return signOut(auth)
    .then(() => {
      window.location.href = '/welcome'
    })
    .catch((error) => {
      throw error
    })
}

export const onAuthChanged = (onChange) =>
  onAuthStateChanged(auth, (user) => {
    onChange(user)
  })

export const addTransaction = async (data) => {
  const user = auth.currentUser
  if (!user) return []

  try {
    await addDoc(collection(db, `users/${user.email}/transactions`), data)
  } catch (e) {}
  return []
}

export const editTransaction = async ({ id, data }) => {
  try {
    const docRef = doc(db, `users/${auth.currentUser.email}/transactions`, id)
    await updateDoc(docRef, data)
  } catch (e) {}
  return []
}

export const deleteTransaction = async (id) => {
  try {
    await deleteDoc(doc(db, `users/${auth.currentUser.email}/transactions`, id))
  } catch (e) {}
  return []
}

export const fetchById = async (id) => {
  try {
    let data = {}
    const docRef = doc(db, `users/${auth.currentUser.email}/transactions`, id)
    const querySnapshot = await getDoc(docRef)
    const document = querySnapshot.data()

    const { createdAt } = document
    const date = +createdAt.toDate()
    data = {
      ...document,
      id: document.id,
      timestamp: date,
      createdAt: findTimeAgo(date)
    }
    return data
  } catch (e) {}
}

export const fetchTransactionList = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `users/${auth.currentUser.email}/transactions`)
    )
    const data = []
    querySnapshot.forEach((doc) => {
      const { createdAt } = doc.data()
      const date = +createdAt.toDate()

      data.push({
        ...doc.data(),
        id: doc.id,
        timestamp: date,
        createdAt: findTimeAgo(date)
      })
    })

    return data.sort((a, b) => b.timestamp - a.timestamp)
  } catch (e) {
    return []
  }
}

export const fetchCategories = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `users/${auth.currentUser.email}/categories`)
    )
    const data = querySnapshot.docs[0].data()
    return data.categories
  } catch (e) {
    return []
  }
}

export const addCategories = async (data) => {
  try {
    const categoriesSnapshot = await getDocs(
      collection(db, `users/${auth.currentUser.email}/categories`)
    )
    if (categoriesSnapshot.docs.length) {
      const categoriesDocId = categoriesSnapshot.docs[0].id
      const docRef = doc(db, `users/${auth.currentUser.email}/categories`, categoriesDocId)
      await updateDoc(docRef, data)
    } else {
      await addDoc(collection(db, `users/${auth.currentUser.email}/categories`), data)
    }
  } catch (e) {}
  return []
}

export const editCategories = async (data) => {
  try {
    const categoriesSnapshot = await getDocs(
      collection(db, `users/${auth.currentUser.email}/categories`)
    )
    const categoriesDocId = categoriesSnapshot.docs[0].id

    const docRef = doc(db, `users/${auth.currentUser.email}/categories`, categoriesDocId)
    await updateDoc(docRef, data)
  } catch (e) {}
  return []
}

export const updateIncome = async (data) => {
  try {
    const incomeSnapshot = await getDocs(collection(db, `users/${auth.currentUser.email}/income`))
    if (incomeSnapshot.docs.length) {
      const categoriesDocId = incomeSnapshot.docs[0].id
      const docRef = doc(db, `users/${auth.currentUser.email}/income`, categoriesDocId)
      await updateDoc(docRef, data)
    } else {
      await addDoc(collection(db, `users/${auth.currentUser.email}/income`), data)
    }
  } catch (e) {}
  return []
}

export const fetchIncome = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser.email}/income`))
    const data = querySnapshot.docs[0].data()
    return data
  } catch (e) {
    return []
  }
}

export const updateExpenses = async (data) => {
  try {
    const expensesSnapshot = await getDocs(
      collection(db, `users/${auth.currentUser.email}/expenses`)
    )
    if (expensesSnapshot.docs.length) {
      const expenseDocId = expensesSnapshot.docs[0].id
      const docRef = doc(db, `users/${auth.currentUser.email}/expenses`, expenseDocId)
      await updateDoc(docRef, data)
    } else {
      await addDoc(collection(db, `users/${auth.currentUser.email}/expenses`), data)
    }
  } catch (e) {}
  return []
}

export const fetchExpenses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser.email}/expenses`))
    const data = querySnapshot.docs[0].data()
    return data
  } catch (e) {
    return []
  }
}
