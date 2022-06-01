/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Dashboard/DashboardItem.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, June 1st 2022, 1:41:27 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

/**
 * Displays Item inside of Dashboard list
 * @param {*} itemValue - Item displayed in list 
 * @returns {DashboardItem}
 */
export const DashboardItem = ({itemValue}) => {

    return ( 
        <li>{itemValue}</li>
    )
}