import React from 'react'

function Footer() {
  return (
    <footer class="bg-gradient-to-r from-cyan-500 to-[#008000]">
        <div class="max-w-screen-xl px-4 pb-6 mx-auto sm:px-6">
    
            <div class="pt-6">
                <div class="text-center sm:flex sm:justify-between sm:text-left">
                    <p class="text-sm text-white">
                        <span class="block sm:inline">All rights reserved.</span>

                        <a class="inline-block text-teal-500 underline transition hover:text-teal-500/75"
                            href="/">
                            Terms & Conditions
                        </a>

                        <span>&middot;</span>

                        <a class="inline-block text-teal-500 underline transition hover:text-teal-500/75"
                            href="/">Privacy Policy
                        </a>
                    </p>

                    <p class="mt-4 text-sm text-white sm:order-first sm:mt-0">&copy; 2024 Rebecca</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer