import PropTypes from 'prop-types'
      import Icon from '../atoms/Icon'
      
      export default function SiteFooter() {
        return (
          <footer className="bg-surface-900 text-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Icon name="MapPin" className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">TripCraft</span>
                </div>
                <p className="text-surface-400 mb-8 max-w-2xl mx-auto">
                  Making travel planning enjoyable, collaborative, and stress-free. Start crafting your next adventure today.
                </p>
                <div className="flex justify-center space-x-6 text-surface-500">
                  <a href="#" className="hover:text-primary transition-colors">
                    <Icon name="Mail" className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Icon name="Twitter" className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Icon name="Instagram" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        )
      }