"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ArrowLeft,
  CheckCircle2,
  Clock,
  Calendar,
  Package,
  CreditCard,
  Award,
  Truck
} from "lucide-react";
import { selectBusiness } from "@/store/slices/selectedBusinessSlice";
import { RootState } from "@/store";

export default function BusinessProfilePage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  // Get business from Redux - FIXED to match your structure
  const allBusinesses = useSelector((state: RootState) => state.businesses.allBusinesses);
  const selectedBusiness = useSelector((state: RootState) => state.selectedBusiness.currentBusiness);
  const connections = useSelector((state: RootState) => state.connections.requests);

  useEffect(() => {
    // Find business by ID and set it in Redux
    const business = allBusinesses.find((b) => b.id === params.id);
    if (business) {
      dispatch(selectBusiness(business));
    }
  }, [params.id, allBusinesses, dispatch]);

  // Check if already connected
  const existingConnection = connections.find(
    (conn) => conn.businessId === params.id
  );

  if (!selectedBusiness) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading business profile...</p>
        </div>
      </div>
    );
  }

  const handleConnect = () => {
    setShowConnectionModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discovery
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                      {selectedBusiness.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {selectedBusiness.name}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary">
                          {selectedBusiness.type}
                        </Badge>
                        <Badge variant="outline">
                          {selectedBusiness.category}
                        </Badge>
                        {selectedBusiness.verified && (
                          <Badge className="bg-green-500">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {selectedBusiness.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* About */}
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">About</h3>
                    <p className="text-gray-600">{selectedBusiness.description}</p>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">Services Offered</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBusiness.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Products */}
                  {selectedBusiness.productsOffered && selectedBusiness.productsOffered.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 text-lg">Products Offered</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedBusiness.productsOffered.map((product, idx) => (
                          <Badge key={idx} variant="outline">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {selectedBusiness.certifications && selectedBusiness.certifications.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        Certifications
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedBusiness.certifications.map((cert, idx) => (
                          <Badge key={idx} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Established</p>
                      <p className="font-semibold">{selectedBusiness.established}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Minimum Order</p>
                      <p className="font-semibold">{selectedBusiness.minimumOrder}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Delivery Time</p>
                      <p className="font-semibold">{selectedBusiness.deliveryTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Business Hours</p>
                      <p className="font-semibold">{selectedBusiness.businessHours}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            {selectedBusiness.paymentMethods && selectedBusiness.paymentMethods.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedBusiness.paymentMethods.map((method, idx) => (
                      <Badge key={idx} variant="outline">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Business Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Business Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
                    <p className="text-3xl font-bold text-amber-600">
                      {selectedBusiness.rating}
                    </p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-teal-600">
                      {selectedBusiness.reviewCount}
                    </p>
                    <p className="text-sm text-gray-600">Reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contact & Action */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <a href={`mailto:${selectedBusiness.email}`} className="text-blue-600 hover:underline">
                      {selectedBusiness.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <a href={`tel:${selectedBusiness.phone}`} className="text-blue-600 hover:underline">
                      {selectedBusiness.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Address</p>
                    <p className="text-gray-700">{selectedBusiness.address}</p>
                  </div>
                </div>
                {selectedBusiness.website && (
                  <div className="flex items-start gap-3 text-sm">
                    <Globe className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Website</p>
                      <a 
                        href={selectedBusiness.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {selectedBusiness.website}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Connection Status / Action */}
            <Card>
              <CardHeader>
                <CardTitle>Connection</CardTitle>
              </CardHeader>
              <CardContent>
                {existingConnection ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      {existingConnection.status === "pending" && (
                        <>
                          <Clock className="w-5 h-5 text-yellow-500" />
                          <div>
                            <p className="font-medium text-sm">Request Pending</p>
                            <p className="text-xs text-gray-600">
                              Waiting for response
                            </p>
                          </div>
                        </>
                      )}
                      {existingConnection.status === "accepted" && (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium text-sm">Connected</p>
                            <p className="text-xs text-gray-600">
                              You can now collaborate
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => router.push("/connections")}
                    >
                      View Connection Details
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Connect with this business to start collaborating and making transactions.
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600" 
                      size="lg"
                      onClick={handleConnect}
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      Send Connection Request
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Connection Modal Placeholder */}
      {showConnectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Connection Request Modal</h2>
            <p className="text-gray-600 mb-4">We&apos;ll build this component next!</p>
            <Button onClick={() => setShowConnectionModal(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}