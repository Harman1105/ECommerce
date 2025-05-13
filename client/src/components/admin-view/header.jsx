import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'

const AdminHeader = () => {
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      {/* Hamburger Button */}
      <Button className="lg:hidden sm:block">
        <AlignJustify />
        <span className='sr-only'>Toggle Menu</span>
      </Button>

      {/* Logout Button */}
      <div className='flex flex-1 justify-end'>
        <Button>
          <LogOut className='mr-2' />
          Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader
