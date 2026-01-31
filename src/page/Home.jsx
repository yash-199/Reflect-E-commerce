import React from 'react'
import Banner from '../components/Banner'
import Collection from '../components/Collection'
import BrandName from '../components/BrandName'
import Category from '../components/Category'
import BestSeller from '../components/BestSeller'
import MiniCheckout from '../components/MiniCheckout'

const Home = () => {
  return (
    <div>
        <Banner/>
        <BrandName/>
        <Collection/>
        <Category/>
        <BestSeller/>
    </div>
  )
}

export default Home