import PropTypes from 'prop-types'
      import SiteHeader from '../organisms/SiteHeader'
      import SiteFooter from '../organisms/SiteFooter'
      
      export default function PageTemplate({ children, selectedTrip }) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-surface-100">
            <SiteHeader selectedTrip={selectedTrip} />
            <main>
              {children}
            </main>
            <SiteFooter />
          </div>
        )
      }
      
      PageTemplate.propTypes = {
        children: PropTypes.node.isRequired,
        selectedTrip: PropTypes.object,
      }