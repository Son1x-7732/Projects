import React from 'react'
import {Bookmark} from 'lucide-react'

const Card = (props) => {
  
  return (
      <div className="card">
        <div className="top">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAw1BMVEX///8AAAD4lyz8///n5+dkZGT3mCr///3///u6urowMDD7+/vy8vJhYWHj4+P4//9BQUFYWFiRkZHT09Pc3NzAwMAoKCgRERH4kx/GxsaCgoI6OjqIiIh8fHyhoaHNzc0ZGRmqqqpKSkptbW2ZmZn77+L4kBH2pEghISH1sGv4iwD7ky779uv6wYv1mTP6x5b4uHfzrF/04cfz1bL3zJ767djso0r216zvmSH3y6nrtXb6/eb079Dw3rPuwof4qVjnoDumPdmRAAAKiUlEQVR4nO1cC1uqShdWIUBB8e6YqeEF0ogURNvuTp7//6u+NWClBQtSdOg7vHtnj6Y4L7Mu71ozkMtlyJAhQ4YMGTJkyJAhQ4YMGTJkyJDh2pCVSnOPiiKzHs3JUBrd4mBS74/LNQ/l8W19oLUa/G+jpHS123Gt95D/htJo3B+0FNYDjA2leHvTu//O4wOdXvm2+Cv4NPrVNkLkHe3RXYX1UKNQrGJTcoz7Mc96uBi6ndhMfIzTamxyo/ZDKhRaKmMbX//ptOwnJ4Wu0z1lWjyMuimbHFnrncoln68WU8VGnpxmYnv0UsXm9hwqlE2XNYNP3J3JBdikJgpMzuaSz5dZk9hDC5CTP4fGmoaHRjUJLvl8GmKAMk6GS77PmglAiy8sI8BedTZPTvzfUGfNRR4kxiVfZe01zUjvhyr5rn7Xv4mWO6UhWy6yho+vNmk1eEWRFaUy1PoRZDqM7YxHPWZUrBzWXnyjjLO5YWtnQ2xsd9/CE49rhRrTeCbXkaEFpXQ8XlSZOo2CCP9i8Ccwx3lgKmkQKwtz5gYS1TqTq47+C8JdIDRnoJZ5d9XRf0F4LAsvtlqIxu4zDGdyqCwrh7fDKjfhZFh20ZTQUSHNMBkpsVmSkUshg+pgMRZxGqb9zWLIoEZN5ENI4rxhmjUb/VGQP9exM4wUQGzJ5EBC8vywWL+tHZAaNbCPFMMXPMqp6dGA9BoWB+Nq5wYfUjHM09JFJh4yMmlFRiat+K+QYZxn4kNW+EZRG0BGCq/o0k+Gb3a1en9cq42qpQe8/ZlmMkpD69eqpVL7Pua6WlrJNAdI3fJ7yMhKczD6OZEUkpH5Yf30dedUkVGa2olzkjoyyrAeZzvTbyAjD+vh2fCXkeEnCSxtpoRMF8nrv43M5GwLSw+ZpBac00DmrHCcLjJKYlzYk+HjabDOfbvUq1aro1EvvSWAEmN31kO1Nr4bFBsVXlGUFBdn8iAqJHdqt9rwsMOZXjLdiJjc7mtf25upJaPgi+H3/YBN/2klE7HZpBq43z+tZCqow9SCFzbSSgaNZLWQdY2UkglfBgR0wj6VUjLozp7Q9SZkfYYhGRnjEr7ZIp1kWgiXXvhyM7LZliEZTPgH75zxoKVRm4UunAMekHZ+KlebG9i+EWS5GdkHwI4MJjGxy5VSSQarY1rhH8N2nJWZkUG2Z94jGwGwjUDMVs6warmEbDfpIq3oEDV3eWA7mqvIoLTwj+WrrK4JwvYnImQU7MKhNpKeLoohkmYQMk2sl9NhteO0hZBBfCZsV5ePO0b7GhElj2ye4/HmZ8QeoosBm5lwadbCmzkPSIK6JNC+TNjuuYgGSMS2u8thiC1djkJSOe4xgB6bTIOF5nw+2Gn46EWcAZMQUEFXymqBY4pzDSSTECDjzf+gEBDr8rSwps5lETG0b14T9xpIJokz4qqr9rG9/OA2Duje2wsBqeU9lIoHk1PR4q96VhkYWiXSnftF7+4/SqWrReWXI7C48iTGwn+tfzeZ3N78dC2agducfxeAMIyub2jNi5FhcflpQtfOB5BhoDcjldap6LHo0py5IysMDywyzclT025iOarEpnsm/yh9fKDazHXD/4pcfHdZNE7ZzUS7Y6GX0d3fMrvuTI7SNAEYe/UXHyy6SxOGl2qibbAgdPp7j2gFRY8e2xuE8VG3LDjG/eTdioL2EFRbjO88EdE8Okb7YJvD9+UA/MK7qyDOvqY9jhvjlS+xMKwLcl1oMbl8bVYc996D2wbXBx+nUxGwLHbYFEnDDYH20NCbgIJCKQcKYf6dDdv7GnyFrJXD9it2SqPbMNdW/M5AO0Y5JoqJDhiH3K2PR18VwX1pdFPH7swq96vtUu2b5Oe4nMrR3zn/EV6QrsqGXspUnNzt7wJcvqG3AhoUGxHyRO5qre/eJHIcp3KiZJpTgGlK8Py6XHwovH+D5gp/jsriVNN2Vk+LxQyweHp2bDMZMv5cXwswA5w0tZ9nhkUI0XXiP1qzjZTA5Mi2e8VJ5nKSaq6Wlk4EQOEDhKxt6eyTKjqGsTJzUhIjjQNOcpaFR6HwWDgiA3C48y3EfiHEWNE5hvm5wgQtyItFwLrmc12fA8j73DgQ0c49uLQhujXf2ZwqXoEL58L49Zd/l9vV6o+z2bxt17pPR0iCTE61Db2gz5eOqV4hEki2/Vf0Mg2NafTX65pYeqFg2QmQgelwl2C/emHmmP4r5x4S/TpVpQ+QZCRJhR8ICTaxYGaMBMiAbUmcuyVwQF1Y2FMpJ14yGcPBYfzwCJEAJgaoiDlTgGBAlm4ydiFx5rNABOtRF5YbV7qOTgIFA5mfRlGTRjWyNRMyCRAXG3Ac8EKd7Fa2mchBI2A6T1vHywgujQBklYD7e6BSyZ4R76ACMRZ/XBqoPYtL5gsOvkmSRMic7mZm6To4PVjBP9RnrE2Cvipy5ooGlQK1X2H3BNNDnTRpMsBE5abOYk3PHCk48ELujQgFYrwm+C0QSiR7t2cDoc0AcxOTD9Wc+td5W1sFL7foC1MFQ1sWII1uk7RtUOE5znwj7wkZ1FJhuXJ9EcrRP56oNmB6acyl8kKFLPNmvAg6eDz815+Ai6i6hlWwLOcCGeHVmB+oP50YW1tSOZoOpFPlG5wDVfWOYD/9CwJzP/nkxc7RzKA69Pnub5Is9l8MkrZA3gUgzWWgodabKZxBkTvt3Il+cpxu1qDFPuQlIW9esQn+v4UXHlcXEe4c97q1PmwNxK1lCfO5tXDsqRkQDr688j1DibI5tTdbCxQZHOrFF/5EmNk5NWfSuOMaBNzfTEAyB0GVnMWezl6kwy8yJ8Zs5biuKdEal/N1FagHkTrDB2j4g3++o9GqGOrJpUGAiGD5h6KzYi03JrzFt1vHgopgpSYeN9/ZcCZkgc/Z+fAgXX8xZk9/HNt1YZq8sXB75+Z8+KFCgtLeBRpvs7UAfvf4+HkQOC3C7nnKfegwc0EeyTqp7P8NYOAc5OcZ0Y/JWJYnEWiNa6xni+eV4zi2bbvTqd+VAAIuPHecP6un2c6w6FuFx/1sfJ4R49mVuI9szNlgZbp9MbkuUsv36Ai01DguB/eeRGh5JbxYhmXsdsuZh+VytzMMy/KqerK3qYNPQ3KhZSBoP6pufTKitIHzs7146QGBzXmy9MeCFcDm80x/QegbPSpUxh5FLW66IPOFeWky1BJEyV29F4LnQtCtrUNl8kHbgpNUx9KX0xODfnx4FQeYgWKDtemBxhaHgvcg6HN9tzHpOgAtyw7ISKs5cDk5H/8c4utqPfdaQwXc5AKZFCAQzNdvr0HnXgT17Fyl3vj8SsjU5mYHMVX4scVBQQEF0tSrJwIAyYpW0dcEjdWcCspqaRQEzMkPZ4W+78XYLbw2CU2nAVMjemX0NfupnmbmvHQtus7bbGdZfgzz0o5A6/dP7KMWTKK1mz3T2LVXOIFqhZK5Sq8uCBATVGnqbFaL2dIAnUU1wUFY9p4VLGMJGXVjuxJYEKOBxgHYG4hnIAR6BVL9H7+Nv/Qxmy0WT1QWgCYwqbyhjZjrhakfg+ZtrzXFvduev8AyfVc0vgj1Gkj+W1M8MxkyZMiQIUOGDBkyZMiQIUOGDBky/J/gf//j7R8ZlQUIAAAAAElFTkSuQmCC" alt="" />
          <button>Save <Bookmark size={16}/></button>
        </div>
        <div className="center">
          <h3>{props.company} <span>{props.datePosted}</span></h3>
          <h2>{props.post}</h2>
          <div className='tag'>
            <h4>{props.tag1}</h4>
            <h4>{props.tag2}</h4>
          </div>
        </div>
        <div className="bottom">
          <div>
            <h3>{props.pay}</h3>
            <p>{props.location}</p>
          </div>
          <button>Apply Now</button>
        </div>
      </div>
  )
}

export default Card

